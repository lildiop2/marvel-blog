
import { Component, OnInit } from '@angular/core';
import  axios  from 'axios';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    events:any[]=[]


  constructor() {
    let hour=Date.now()
    let publicKey='ce9cf6a8d8e20f765f8e7448d9e7aa34'
    let privateKey='4273d0abcf2d28a1ca7ba07f2ab701f224a9a843'

    axios.get('http://gateway.marvel.com/v1/public/events', {
      params: {
        ts: hour,
        apikey:publicKey,
        hash: Md5.hashStr(`${hour}${privateKey}${publicKey}`)
      }
    }).then((res)=>{
      let events=res.data.data.results.map((e:any)=>{
        return{
          id:e.id,
          title:e.title,
          description:e.description,
          cover:e.thumbnail.path+"."+e.thumbnail.extension
        }

      })
      this.events=events
      // console.log(events)
    }).catch((e)=> console.log(e))
  }

  ngOnInit(): void {
  }

}
