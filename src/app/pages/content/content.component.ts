import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  photoCover:string = ""
  contentTitle:string = ""
  contentDescription:string = ""
  private id:string | null = "0"
  events:any[]=[]

  constructor(
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( value =>
     this.id = value.get("id")
    )

    this.setValuesToComponent(this.id)
  }

  setValuesToComponent(id:string | null){
    let hour=Date.now()
    let publicKey='ce9cf6a8d8e20f765f8e7448d9e7aa34'
    let privateKey='4273d0abcf2d28a1ca7ba07f2ab701f224a9a843'

    axios.get(`http://gateway.marvel.com/v1/public/events/${id}`, {
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
      // this.contentTitle = result.title
      // this.contentDescription = result.description
      // this.photoCover = result.photoCover
      this.events=events
      console.log(events)
    }).catch((e)=> console.log(e))



  }

}
