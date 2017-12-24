import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {ArticleService} from './article.service';
import {Book} from './article';


import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import {DataTableDirective} from "angular-datatables";



@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit,AfterViewInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();


  //Component properties
  allArticles: Book[]=[];
  statusCode: number;
  requestProcessing = false;
  articleIdToUpdate = null;
  processValidation = false;

  //Create form
  articleForm = new FormGroup({
    name: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    page: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required)
  });

  //Create constructor to get service instance
  constructor(private articleService: ArticleService) {
  }

  //Create ngOnInit() and and load articles
  ngOnInit(): void {
    this.getAllArticles();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  //Fetch all articles
  getAllArticles() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 3
    };
    this.articleService.getAllArticles()
      .subscribe(
        data => {
          this.allArticles = data;
          //this.dtTrigger.next();
          this.rerender();
        },
        errorCode => this.statusCode = errorCode);
  }

  //Handle create and update article
  onArticleFormSubmit() {

    this.processValidation = true;
    if (this.articleForm.invalid) {
      return; //Validation failed, exit from method.
    }
    //Form is valid, now perform create or update
    this.preProcessConfigurations();
    let article = this.articleForm.value;
    if (this.articleIdToUpdate === null) {

      //Generate article id then create article
      this.articleService.getAllArticles().subscribe(articles => {

          //Generate article id
          let maxIndex = articles.length - 1;
          let articleWithMaxIndex = articles[maxIndex];
          let articleId = articleWithMaxIndex.id + 1;
          article.id = articleId;

          //Create article
          this.articleService.createArticle(article)
            .subscribe(successCode => {
                this.statusCode = successCode;
                this.getAllArticles();
                this.backToCreateArticle();
              },
              errorCode => this.statusCode = errorCode
            );
        });
    } else {
      //Handle update article
      article.id = this.articleIdToUpdate;
      this.articleService.updateArticle(article)
        .subscribe(successCode => {
            this.statusCode = successCode;
            this.getAllArticles();
            this.backToCreateArticle();
          },
          errorCode => this.statusCode = errorCode);
    }
  }

  //Load article by id to edit
  loadArticleToEdit(articleId: string) {
    this.preProcessConfigurations();
    this.articleService.getArticleById(articleId)
      .subscribe(article => {
          this.articleIdToUpdate = article.id;
          this.articleForm.setValue({name: article.name, author: article.author,page:article.page,date:article.date});
          this.processValidation = true;
          this.requestProcessing = false;
        },
        errorCode => this.statusCode = errorCode);
  }

  //Delete article
  deleteArticle(articleId: string) {
    this.preProcessConfigurations();
    this.articleService.deleteArticleById(articleId)
      .subscribe(successCode => {
          //Expecting success code 204 from server
          this.statusCode = 204;
          this.getAllArticles();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
  }

  //Perform preliminary processing configurations
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }

  //Go back from update to create
  backToCreateArticle() {
    this.articleIdToUpdate = null;
    this.articleForm.reset();
    this.processValidation = false;
  }


  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
}
