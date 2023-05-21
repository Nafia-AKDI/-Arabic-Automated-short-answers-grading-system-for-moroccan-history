import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CREATE_QUESTION, GET_ANSWERS } from '../graphql.operations';
import { Router } from '@angular/router';




@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})


export class DefaultComponent implements OnInit {
  nbr=1;
  ansr: string = '';
  currentQuestionIndex = 0;
  
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
 

  constructor(private apollo: Apollo,private router: Router) { }

  ngOnInit(): void {
  }

  postAnswer(id: any, answer: any): void {
    this.apollo
  .mutate({
    mutation: CREATE_QUESTION,
    variables: {
      id: id,
      answer: answer
    }
  })
  .subscribe({
    next: result => {
      console.log('Mutation result:', result.data);
    },
    error: error => {
      console.log('Mutation error:', error);
    }
  });
  }
  onSubmit() {
   
    this.postAnswer(this.nbr.toString(), this.ansr);
    this.ansr=''
       //this.nbr++;
    this.router.navigate(['/grade']);
    
  }
  
  nextQuestion() {
    if (this.currentQuestionIndex < 9) {
      this.currentQuestionIndex++;
      this.postAnswer(this.nbr.toString(), this.ansr);
      this.ansr=''
       this.nbr++;
    }else{
     // this.router.navigate(['/grade']);
    }
  }

  
}
