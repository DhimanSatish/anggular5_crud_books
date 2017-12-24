import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Book } from './article';
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ArticleService {
    //URL for CRUD operations
	articleUrl = "http://localhost:3000/books";
	//Create constructor to get Http instance
	constructor(private http:HttpClient) {
	}
	//Fetch all articles
    getAllArticles(): Observable<any> {
        return this.http.get(this.articleUrl);


    }
	//Create article
    createArticle(article: Book):Observable<any> {
        return this.http.post(this.articleUrl, article);
    }
	//Fetch article by id
    getArticleById(articleId: string): Observable<any> {
		  console.log(this.articleUrl +"/"+ articleId);
		  return this.http.get(this.articleUrl +"/"+ articleId);
    }
	//Update article
    updateArticle(article: Book):Observable<any> {
        return this.http.put(this.articleUrl +"/"+ article.id, article);
    }

    //Delete article
    deleteArticleById(articleId: string): Observable<any> {
		    return this.http.delete(this.articleUrl +"/"+ articleId);
    }
}
