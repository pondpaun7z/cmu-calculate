import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  private subjects

  constructor() { }

  ngOnInit() {
    sessionStorage.clear();
    if (sessionStorage.getItem('subjects') !== null) {
      this.subjects =  JSON.parse(sessionStorage.getItem('subjects'))
    } else {
      this.subjects = [{title: '', credit: 3, grade: 4}]
    }
  }

  addSubject() {
    this.subjects.push({title: '', credit: 3, grade: 4})
    this.saveSession()
  }

  totalCredit(): number {
    let totalCredit = 0.0
    for (const subject of this.subjects) {
      totalCredit += subject.credit
    }

    return totalCredit
  }

  totalGpa(): number {
    let totalGrade = 0.0
    for (const subject of this.subjects) {
      totalGrade += (subject.grade * subject.credit)
    }

    return totalGrade / this.totalCredit()
  }

  remove(index) {
    this.subjects.slice(index, 1)
    this.saveSession()
  }

  saveSession() {
    sessionStorage.setItem('subjects', JSON.stringify(this.subjects));
  }

}
