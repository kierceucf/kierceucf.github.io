export default {
  id: "grade-calculator",
  icon: "📊",
  title: "Student Grade Calculator",
  description:
    "A C++ console app that accepts student names and scores, calculates letter grades, class average, and identifies the highest and lowest scorers. Covers structs, vectors, loops, and sorting.",
  tags: ["C++", "Structs", "Vectors"],
  code: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

struct Student {
    string name;
    double score;
    char grade;
};

char toGrade(double s) {
    if (s >= 90) return 'A';
    if (s >= 80) return 'B';
    if (s >= 70) return 'C';
    if (s >= 60) return 'D';
    return 'F';
}

int main() {
    int n;
    cout << "Number of students: ";
    cin >> n;
    cin.ignore();

    vector<Student> students(n);
    double total = 0;

    for (auto &s : students) {
        cout << "Name: "; getline(cin, s.name);
        cout << "Score: "; cin >> s.score; cin.ignore();
        s.grade = toGrade(s.score);
        total += s.score;
    }

    sort(students.begin(), students.end(),
         [](const Student &a, const Student &b){ return a.score > b.score; });

    cout << "\\n--- Results ---\\n";
    for (auto &s : students)
        cout << s.name << ": " << s.score << " (" << s.grade << ")\\n";

    cout << "\\nClass average : " << total / n << "\\n";
    cout << "Top scorer    : " << students.front().name << "\\n";
    cout << "Lowest scorer : " << students.back().name  << "\\n";
    return 0;
}`,
};
