import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_ANSWERS } from '../graphql.operations';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {
  answers : any[]=[];
  loading = true;
  error: any;
  grade=0;

  questions: string[] = ["سؤال 1 : ما هي ظروف فرض الحماية الفرنسية على المغرب ؟",
  "سؤال 2 : ما هي مراحل الاحتلال العسكري  للمغرب ؟",
  "سؤال 3 : اذكر اسماء اهم المقاومين المغاربة و بين دورهم في مواجهة الاحتلال ؟",
  " سؤال 4 : ما مظاهر الاستغلال الاستعماري  في المجال الاقتصادي للمغرب ؟ ",
  "سؤال 5 : ما هي انعكاسات الاستغلال الاستعماري على الاقتصاد و المجتمع المغربيين ؟",
  "سؤال 6 : ما هي ظروف ظهور الحركة الوطنية ؟",
  "سؤال 7 : ما هي ظروف تقديم المغرب لوثيقة الاستقلال ؟",
  "سؤال 8 : ما علاقة ثورة الملك و الشعب باستقلال المغرب ؟",
  "سؤال 9 : ما هي الضغوط العسكرية التي استعملتها الدول الامبريالية للتغلغل الاوروبي في المغرب خلال القرن 19 م ؟ ",
  "سؤال 10  : ما نوعية الاصلاحات الاجتماعية التي باشرها المغرب  خلال القرن 19 م ؟ "
  
];

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery<any>({
      query: GET_ANSWERS
    }).valueChanges.subscribe(result => {
        this.answers = result.data.questions;
        console.log(result.data);
        this.loading = result.loading;
        this.error = result.errors;
        this.grade=0;
    for (let answer in this.answers) {
      this.grade += parseInt(this.answers[answer].score);
      
    }
      },
      error => {
        console.log(error);
      }
    );
    

  }

}
