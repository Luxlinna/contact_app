import json
from pathlib import Path

DB_FILE = Path(__file__).parent / "contacts.json"


def _load():
    if DB_FILE.exists():
        try:
            with open(DB_FILE, "r") as f:
                return json.load(f)
        except (json.JSONDecodeError, IOError):
            return []
    return []


contacts_db = _load()


def save_db():
    with open(DB_FILE, "w") as f:
        json.dump(contacts_db, f, indent=2, default=str)
