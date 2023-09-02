interface Array<T> {
  toSorted: (compareFn?: ((a: T, b: T) => number)) => Array<T>;
}

Array.prototype.toSorted = function (predicate) {
  return [...this].sort(predicate);
};


const enum GroupAreas {}
const enum GroupStatuses {}
const enum GradeMarks {}

class School {
  // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods

  _areas: Area[] = [];
  _lecturers: {
    id: string;
    name: string;
    surname: string;
    position: string;
    company: string;
    experiance: number;
    courses: string[];
    contacts: string[];
  }[] = []; // Name, surname, position, company, experience, courses, contacts

  get areas(): Area[] {
    return [...this._areas];
  }

  get lecturers(): {
    id: string;
    name: string;
    surname: string;
    position: string;
    company: string;
    experiance: number;
    courses: string[];
    contacts: string[];
  }[] {
    return [...this._lecturers];
  }

  addArea(area: Area): void {
    this._areas.push(area);
  }

  removeArea(areaName: string): boolean {
    const removeIndex: number = this._areas.findIndex(
      (area) => area.name === areaName
    );
    if (removeIndex >= 0) {
      this._areas.splice(removeIndex, 1);
      return true;
    }
    return false;
  }

  addLecturer(lecturer: {
    id: string;
    name: string;
    surname: string;
    position: string;
    company: string;
    experiance: number;
    courses: string[];
    contacts: string[];
  }): void {
    this._lecturers.push(lecturer);
  }

  removeLecturer(id: string): boolean {
    const removeIndex: number = this._lecturers.findIndex(
      (lecturer) => lecturer.id === id
    );
    if (removeIndex >= 0) {
      this._lecturers.splice(removeIndex, 1);
      return true;
    }
    return false;
  }
}

class Area {
  // implement getters for fields and 'add/remove level' methods
  _levels: Level[] = [];
  _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get levels(): Level[] {
    return [...this._levels];
  }

  get name(): string {
    return this._name;
  }

  addLevel(level: Level): void {
    this._levels.push(level);
  }

  removeLevel(levelName: string): boolean {
    const removeIndex: number = this._levels.findIndex(
      (level) => level.name === levelName
    );
    if (removeIndex >= 0) {
      this._levels.splice(removeIndex, 1);
      return true;
    }
    return false;
  }
}

class Level {
  // implement getters for fields and 'add/remove group' methods

  _groups: Group[] = [];
  _name: string;
  _description: string;

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get groups(): Group[] {
    return [...this._groups];
  }
}

class Group {
  // implement getters for fields and 'add/remove student' and 'set status' methods

  _students: Student[] = []; // Modify the array so that it has a valid toSorted method*
  _area: Area;
  _status: GroupStatuses;
  _directionName: string;
  _levelName: string;

  constructor(
    directionName: string,
    levelName: string,
    area: Area,
    status: GroupStatuses
  ) {
    this._directionName = directionName;
    this._levelName = levelName;
    this._area = area;
    this._status = status;
  }

  get students(): Student[] {
    return [...this._students];
  }

  get area(): Area {
    return this._area;
  }

  get status(): GroupStatuses {
    return this._status;
  }

  set status(newStatus: GroupStatuses) {
    this._status = newStatus;
  }

  get directionName(): string {
    return this._directionName;
  }

  get levelName(): string {
    return this._levelName;
  }

  addStudent(student: Student): void {
    this._students.push(student);
  }

  removeStudent({ fullName, age }: { fullName: string; age: number }): boolean {
    const removeIndex: number = this._students.findIndex(
      (student) => student.fullName === fullName && student.age === age
    );
    if (removeIndex >= 0) {
      this._students.splice(removeIndex, 1);
      return true;
    }
    return false;
  }

  showPerformance(): Student[] {
    const sortedStudents = this._students.toSorted(
      (a, b) => b.getPerformanceRating() - a.getPerformanceRating()
    );
    return sortedStudents;
  }
}

class Student {
  // implement 'set grade' and 'set visit' methods

  _firstName: string;
  _lastName: string;
  _birthYear: number;
  _grades: Record<string, number> = {}; // workName: mark
  _visits: boolean[] = []; // lesson: present

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value) {
    [this._lastName, this._firstName] = value.split(" ");
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  set grade({workName, mark}: {workName: string, mark: number}) {
    this._grades[workName] = mark;
  }

  set visit(isPresented: boolean) {
    this._visits.push(isPresented);
  }

  getPerformanceRating(): number {
    const gradeValues: number[] = Object.values(this._grades);

    if (!gradeValues.length) return 0;

    const averageGrade =
      gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
    const attendancePercentage =
      (this._visits.filter((present) => present).length / this._visits.length) *
      100;

    return (averageGrade + attendancePercentage) / 2;
  }
}
