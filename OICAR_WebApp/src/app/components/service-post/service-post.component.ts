import { Component, Input, OnInit } from '@angular/core';
import { ServicePost } from 'src/app/models/service-post';

@Component({
  selector: 'app-service-post',
  templateUrl: './service-post.component.html',
  styleUrls: ['./service-post.component.css']
})
export class ServicePostComponent implements OnInit {

  @Input() servicePost!: ServicePost;
  constructor() { }

  ngOnInit(): void {
  }

}
