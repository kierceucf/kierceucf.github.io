export default {
  id: "contact-book",
  icon: "📒",
  title: "Contact Book CLI",
  description:
    "A command-line contact manager in Python. Supports adding, searching, updating, and deleting contacts stored in a local JSON file. Practices file I/O, dictionaries, and input validation.",
  tags: ["Python", "File I/O", "CLI"],
  code: `import json, os

FILE = "contacts.json"

def load():
    if not os.path.exists(FILE):
        return []
    with open(FILE) as f:
        return json.load(f)

def save(contacts):
    with open(FILE, "w") as f:
        json.dump(contacts, f, indent=2)

def add(contacts):
    name  = input("Name: ").strip()
    phone = input("Phone: ").strip()
    email = input("Email: ").strip()
    contacts.append({"name": name, "phone": phone, "email": email})
    save(contacts)
    print(f"  ✓ Added {name}")

def search(contacts):
    q = input("Search name: ").strip().lower()
    results = [c for c in contacts if q in c["name"].lower()]
    for c in results:
        print(f"  {c['name']} | {c['phone']} | {c['email']}")
    if not results:
        print("  No results found.")

def delete(contacts):
    q = input("Delete name: ").strip().lower()
    before = len(contacts)
    contacts[:] = [c for c in contacts if c["name"].lower() != q]
    save(contacts)
    print(f"  Removed {before - len(contacts)} contact(s).")

def main():
    contacts = load()
    actions = {"1": add, "2": search, "3": delete}
    while True:
        print("\\n1) Add  2) Search  3) Delete  4) Quit")
        choice = input("> ").strip()
        if choice == "4":
            break
        if choice in actions:
            actions[choice](contacts)

if __name__ == "__main__":
    main()`,
};
