export default {
  id: "expense-tracker",
  icon: "💰",
  title: "Expense Tracker",
  description:
    "A Python script for logging daily expenses by category (food, transport, etc.), calculating totals per category, and displaying a spending summary. Demonstrates lists, dicts, and basic data aggregation.",
  tags: ["Python", "Data Aggregation", "CLI"],
  code: `expenses = []

def add_expense():
    category = input("Category (food/transport/other): ").strip().lower()
    desc     = input("Description: ").strip()
    amount   = float(input("Amount ($): "))
    expenses.append({"category": category,
                     "desc": desc, "amount": amount})
    print(f"  ✓ Logged \${amount:.2f} under '{category}'")

def summary():
    if not expenses:
        print("  No expenses logged yet.")
        return
    totals = {}
    for e in expenses:
        totals[e["category"]] = totals.get(e["category"], 0) + e["amount"]
    print("\\n--- Spending Summary ---")
    for cat, total in sorted(totals.items()):
        print(f"  {cat.capitalize():15} \${total:.2f}")
    print(f"  {'TOTAL':15} \${sum(totals.values()):.2f}")

def main():
    while True:
        print("\\n1) Add expense  2) Summary  3) Quit")
        choice = input("> ").strip()
        if choice == "1": add_expense()
        elif choice == "2": summary()
        elif choice == "3": break

if __name__ == "__main__":
    main()`,
};
