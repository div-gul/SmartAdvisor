import aiosqlite
import json
import os
from datetime import datetime
from config import settings

DB_PATH = os.path.join(os.path.dirname(__file__), settings.DATABASE_PATH)

async def init_db():
    async with aiosqlite.connect(DB_PATH) as db:
        # Users table
        await db.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            name TEXT,
            email TEXT UNIQUE,
            phone TEXT,
            password TEXT,
            role TEXT DEFAULT 'user',
            age TEXT,
            occupation TEXT,
            income TEXT,
            goals TEXT,
            risk_tolerance TEXT,
            address TEXT,
            pan TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """)
        
        # Leads table
        await db.execute("""
        CREATE TABLE IF NOT EXISTS leads (
            id TEXT PRIMARY KEY,
            user_id TEXT,
            persona TEXT,
            lead_score INTEGER DEFAULT 0,
            lead_tier TEXT DEFAULT 'Cold',
            status TEXT DEFAULT 'active',
            recommended_product TEXT,
            recommended_action TEXT,
            conversion_probability REAL DEFAULT 0.0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
        """)
        
        # Chat history table
        await db.execute("""
        CREATE TABLE IF NOT EXISTS chat_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            lead_id TEXT,
            role TEXT,
            content TEXT,
            agent_name TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (lead_id) REFERENCES leads(id)
        )
        """)
        
        # Agent decisions log
        await db.execute("""
        CREATE TABLE IF NOT EXISTS agent_decisions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            lead_id TEXT,
            agent_name TEXT,
            decision TEXT,
            context_summary TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (lead_id) REFERENCES leads(id)
        )
        """)
        
        # Predictions table
        await db.execute("""
        CREATE TABLE IF NOT EXISTS predictions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            lead_id TEXT,
            prediction_type TEXT,
            value REAL,
            explanation TEXT,
            model_version TEXT DEFAULT 'v1',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (lead_id) REFERENCES leads(id)
        )
        """)
        
        await db.commit()

def get_db_connection():
    return aiosqlite.connect(DB_PATH)

# Helper functions for database access
async def save_user(user_id: str, name: str = "", email: str = "", phone: str = "", password: str = "", role: str = "user"):
    async with get_db_connection() as db:
        await db.execute(
            """INSERT OR IGNORE INTO users 
               (id, name, email, phone, password, role, age, occupation, income, goals, risk_tolerance, address, pan) 
               VALUES (?, ?, ?, ?, ?, ?, '', '', '', '', '', '', '')""",
            (user_id, name, email, phone, password, role)
        )
        await db.commit()

async def get_user_by_email(email: str):
    async with get_db_connection() as db:
        db.row_factory = aiosqlite.Row
        async with db.execute("SELECT * FROM users WHERE email = ?", (email,)) as cursor:
            row = await cursor.fetchone()
            return dict(row) if row else None

async def get_user(user_id: str):
    async with get_db_connection() as db:
        db.row_factory = aiosqlite.Row
        async with db.execute("SELECT * FROM users WHERE id = ?", (user_id,)) as cursor:
            row = await cursor.fetchone()
            return dict(row) if row else None

async def update_user_profile(user_id: str, **kwargs):
    if not kwargs:
        return
    async with get_db_connection() as db:
        set_clauses = []
        params = []
        valid_columns = ('name', 'phone', 'age', 'occupation', 'income', 'goals', 'risk_tolerance', 'address', 'pan')
        for key, val in kwargs.items():
            if key in valid_columns:
                set_clauses.append(f"{key} = ?")
                params.append(val)
        
        if not set_clauses:
            return
            
        params.append(user_id)
        query = f"UPDATE users SET {', '.join(set_clauses)} WHERE id = ?"
        await db.execute(query, tuple(params))
        await db.commit()

async def save_lead(lead_id: str, user_id: str = None, persona: dict = None, lead_score: int = 0, 
                    lead_tier: str = "Cold", status: str = "active", recommended_product: str = None, 
                    recommended_action: dict = None, conversion_probability: float = 0.0):
    async with get_db_connection() as db:
        persona_json = json.dumps(persona) if persona else None
        action_json = json.dumps(recommended_action) if recommended_action else None
        
        # Check if lead exists
        async with db.execute("SELECT id FROM leads WHERE id = ?", (lead_id,)) as cursor:
            exists = await cursor.fetchone()
            
        if exists:
            await db.execute(
                """UPDATE leads SET 
                   user_id = COALESCE(?, user_id),
                   persona = COALESCE(?, persona),
                   lead_score = ?,
                   lead_tier = ?,
                   status = ?,
                   recommended_product = COALESCE(?, recommended_product),
                   recommended_action = COALESCE(?, recommended_action),
                   conversion_probability = ?,
                   updated_at = CURRENT_TIMESTAMP
                   WHERE id = ?""",
                (user_id, persona_json, lead_score, lead_tier, status, recommended_product, action_json, conversion_probability, lead_id)
            )
        else:
            await db.execute(
                """INSERT INTO leads (id, user_id, persona, lead_score, lead_tier, status, recommended_product, recommended_action, conversion_probability)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (lead_id, user_id, persona_json, lead_score, lead_tier, status, recommended_product, action_json, conversion_probability)
            )
        await db.commit()

async def get_lead(lead_id: str):
    async with get_db_connection() as db:
        db.row_factory = aiosqlite.Row
        async with db.execute("SELECT * FROM leads WHERE id = ?", (lead_id,)) as cursor:
            row = await cursor.fetchone()
            if row:
                res = dict(row)
                res['persona'] = json.loads(res['persona']) if res['persona'] else None
                res['recommended_action'] = json.loads(res['recommended_action']) if res['recommended_action'] else None
                return res
            return None

async def update_lead(lead_id: str, **kwargs):
    if not kwargs:
        return
    async with get_db_connection() as db:
        set_clauses = []
        params = []
        for key, val in kwargs.items():
            if key in ('persona', 'recommended_action'):
                val = json.dumps(val) if val else None
            set_clauses.append(f"{key} = ?")
            params.append(val)
        
        params.append(lead_id)
        query = f"UPDATE leads SET {', '.join(set_clauses)}, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
        await db.execute(query, tuple(params))
        await db.commit()

async def save_message(lead_id: str, role: str, content: str, agent_name: str = None):
    async with get_db_connection() as db:
        await db.execute(
            "INSERT INTO chat_messages (lead_id, role, content, agent_name) VALUES (?, ?, ?, ?)",
            (lead_id, role, content, agent_name)
        )
        await db.commit()

async def get_messages(lead_id: str):
    async with get_db_connection() as db:
        db.row_factory = aiosqlite.Row
        async with db.execute("SELECT role, content, agent_name, created_at FROM chat_messages WHERE lead_id = ? ORDER BY id ASC", (lead_id,)) as cursor:
            rows = await cursor.fetchall()
            return [dict(row) for row in rows]

async def save_agent_decision(lead_id: str, agent_name: str, decision: dict, context_summary: str = ""):
    async with get_db_connection() as db:
        await db.execute(
            "INSERT INTO agent_decisions (lead_id, agent_name, decision, context_summary) VALUES (?, ?, ?, ?)",
            (lead_id, agent_name, json.dumps(decision), context_summary)
        )
        await db.commit()

async def get_agent_decisions(lead_id: str):
    async with get_db_connection() as db:
        db.row_factory = aiosqlite.Row
        async with db.execute("SELECT agent_name, decision, context_summary, created_at FROM agent_decisions WHERE lead_id = ? ORDER BY id DESC", (lead_id,)) as cursor:
            rows = await cursor.fetchall()
            res = []
            for row in rows:
                d = dict(row)
                d['decision'] = json.loads(d['decision']) if d['decision'] else None
                res.append(d)
            return res

async def save_prediction(lead_id: str, prediction_type: str, value: float, explanation: str, model_version: str = "v1"):
    async with get_db_connection() as db:
        await db.execute(
            "INSERT INTO predictions (lead_id, prediction_type, value, explanation, model_version) VALUES (?, ?, ?, ?, ?)",
            (lead_id, prediction_type, value, explanation, model_version)
        )
        await db.commit()

async def get_all_leads():
    async with get_db_connection() as db:
        db.row_factory = aiosqlite.Row
        async with db.execute("""
            SELECT l.*, u.name, u.email, u.phone 
            FROM leads l 
            LEFT JOIN users u ON l.user_id = u.id 
            ORDER BY l.updated_at DESC
        """) as cursor:
            rows = await cursor.fetchall()
            res = []
            for row in rows:
                d = dict(row)
                d['persona'] = json.loads(d['persona']) if d['persona'] else None
                d['recommended_action'] = json.loads(d['recommended_action']) if d['recommended_action'] else None
                res.append(d)
            return res
