import { Injectable } from '@angular/core';
import { UiType } from '../enums/ui-type.enum';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IAnswear {

  label?: string;
  selectOn?: any[];
  isBot: boolean;
  title?: string;
  uitype?: number;
  options?: IAnswear[];
  payload?: any;
  end?: boolean;
  save?: boolean;
}

const finishFeedbackOptions: IAnswear[] = [
  {
    isBot: false,
    title: 'submit',
    save: true,
    options: [
      {
        isBot: true,
        title: "Thanks for your time! \n We'll get back to you soon...", //'Thanks for the feedback',
        end: true,

      }
    ]
  },
  {
    isBot: false,
    title: 'cancel',
    end: true
  }
]



const answers: IAnswear =
{
  isBot: true,
  title: `Thank you for reaching out! \n what is your name?`,
  uitype: UiType.TEXT,
  label: "personName",
  options: [
    {
      isBot: true,
      title: "Hi #personName, What is your Start-up name?",
      uitype: UiType.TEXT,
      label: "startup",
      options: [
        {
          label: "areas",
          isBot: true,
          title: "Please select the areas that #startupName is dealing with:",
          /*
          1 - "Network"
          2 - "5G"
          3 - "Cyber Security"
          4 - "Entertainment"
          5 - "Field Operations"
          6 - "Customer Care"
          7 - "IoT"
          8 - "First Responders"
          9 - "Other"
          */
          payload: ["Network", "5G", "Cyber Security", "Entertainment", "Field Operations", "Customer Care", "IoT", "First Responders", "Other"],
          uitype: UiType.MULTI_SELECT,
          options: [
            {
              selectOn: [1, 2, 3, 4, 5, 6, 7, 8],
              isBot: true,
              title: "Thanks for reaching out!",
              uitype: UiType.BUTN_GROUP,
              options: finishFeedbackOptions
            },
            {
              selectOn: [9],
              title: "Please specify the other areas you were reffering to:",
              uitype: UiType.TEXT,
              label: "other",
              isBot: true,
              options: [
                {
                  isBot: true,
                  title: "Thanks for reaching out!",
                  uitype: UiType.BUTN_GROUP,
                  options: finishFeedbackOptions
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}


/*
const answers: IAnswear =
{
  isBot: true,
  title: `Hello #user,\n what would you like to report`,
  uitype: UiType.BUTN_GROUP,
  options: [
    {
      label:"type",
      isBot: false,
      title: 'bug',
      options: [
        {
          isBot: true,
          title: "Great. What went wrong?",
          uitype: UiType.TEXT,
          label:"feedback",
          options: [
            {isBot: true,
              title: 'test multi select',
              payload: ["option 1", "option 2"],
              uitype: UiType.MULTI_SELECT,
              options: [
                {
                  selectOn: [1],
                  isBot: true,
                  title: "thanks for chosing 1",
                  uitype: UiType.BUTN_GROUP,
                  options: finishFeedbackOptions
                },
                {
                  selectOn: [2],
                  isBot: true,
                  title: "thanks for chosing 2",
                  uitype: UiType.BUTN_GROUP,
                  options: finishFeedbackOptions
                },
              ]
            },



            {
              isBot: true,
              title: 'Got it,\nPlease rank how urgent you consider the matter on a scale between 1="Nice to have" to 5="Critical"',
              payload: [1, 5],
              uitype: UiType.SLIDER,
              options: [
                {
                  selectOn: [1],
                  isBot: true,
                  title: "Reporting as minor issue.\n Let's summarize:\nyou're reporting a bug.\nTitle: #feedback.\nPriority is #severity",
                  uitype: UiType.BUTN_GROUP,
                  options: finishFeedbackOptions
                },
                {
                  selectOn: [2, 3],
                  isBot: true,
                  title: "Reporting as important but not urgent.\n Let's summarize:\nyou're reporting a bug.\nTitle: #feedback.\nPriority is #severity",
                  uitype: UiType.BUTN_GROUP,
                  options: finishFeedbackOptions
                },
                {
                  selectOn: [4, 5],
                  isBot: true,
                  title: "OK, this is serious.\nReporting as urgent.\n Let's summarize:\nyou're reporting a bug.\n Title: #feedback .\nPriority is #severity. ",
                  uitype: UiType.BUTN_GROUP,
                  options: finishFeedbackOptions
                },
              ]
            }
          ]
        }
      ]
    },
    {
      label:"type",
      isBot: false,
      title: 'suggestion',
      options: [
        {

          isBot: true,
          title: "Exciting!\nCan you shortly describe your suggestion?",
          uitype: UiType.TEXT,
          save:true,
          options: [
            {
              isBot: true,
              title: 'Thanks for the feedback',
              end: true
            }
          ]

        }
      ]
    },
    {
      label:"type",
      isBot: false,
      title: 'comment',
      options: [
        {
          isBot: true,
          title: "Great!. please write your your comment below",
          uitype: UiType.TEXT,
          save:true,
          options: [
            {
              isBot: true,
              title: 'Thanks for the feedback',
              end: true
            }
          ]
        }
      ]
    }
  ]
}
*/


export class BotService {
  _botAnswer$: BehaviorSubject<IAnswear>
  chatHistory: any[] = [];

  constructor() {
    this._botAnswer$ = <BehaviorSubject<IAnswear>>new BehaviorSubject(Object.assign({}, answers));
  }

  get botAnswer$(): Observable<IAnswear> { return this._botAnswer$.asObservable(); }

  reset() {
    this.chatHistory = [];
    this._botAnswer$.next(Object.assign({}, answers));
  }

  addUserIput(label: string, input: string) {
    this.chatHistory.push({ label: label, value: input });
  }

  getUserInput(byLabel: string): string {
    let obj = this.chatHistory.find(a => a.label == byLabel)
    return obj ? obj.value : "";
  }

}
