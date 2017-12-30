import { Component, OnInit } from '@angular/core';
import { CmuSisService } from '../shared/service/cmu-sis/cmu-sis.service'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers: [
    CmuSisService
  ]
})
export class WelcomeComponent implements OnInit {
  subjects
  email: string
  password: string
  isLoading = false
  isError = false

  constructor(
    private cmuSisService: CmuSisService) { }

  ngOnInit() {
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
    let calculatecredit = 0
    for (const subject of this.subjects) {
      if (subject.grade > 0) {
        totalGrade += (subject.grade * subject.credit)
        calculatecredit += subject.credit
      }
    }

    return totalGrade / calculatecredit
  }

  remove(index) {
    this.subjects.slice(index, 1)
    this.saveSession()
  }


  clearSubjects() {
    const confirmed = confirm('คุณต้องการลบวิชาทั้งหมด?')
    if (!confirmed) { return }
    this.subjects = []
    this.saveSession()
  }

  gradeToN(grade: string): number {
    if (grade === 'A') {
      return 4
    } else if (grade === 'B+') {
      return 3.5
    } else if (grade === 'B') {
      return 3
    } else if (grade === 'C+') {
      return 2.5
    } else if (grade === 'C') {
      return 2
    } else if (grade === 'D+') {
      return 1.5
    } else if (grade === 'D') {
      return 1
    } else if (grade === 'F') {
      return 0
    } else if (grade === 'S') {
      return -2
    } else {
      return -1
    }
  }

   submit() {
    this.isLoading = true
    this.isError = false
    this.cmuSisService.getStudentEnroll(this.email, this.password)
      .subscribe(resp => {
        this.isLoading = false
        this.subjects = resp;
        this.subjects.map(subject => subject.grade = this.gradeToN(subject.grade))
        this.saveSession()
      }, error => {
        this.isError = true
        this.isLoading = false
        console.log(error.json())
      })
  }

  saveSession() {
    sessionStorage.setItem('subjects', JSON.stringify(this.subjects));
  }

}
