/* eslint-disable prettier/prettier */
import { Controller, Get, Req, Res, Post } from '@nestjs/common';
import { Request, Response } from "express";
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {

    constructor(
        private apiService: ApiService,
    ){}

    @Get('github-redirect')
    async generateToken(@Req() req:Request, @Res() res: Response) {
        if(req.query.code){
            res.clearCookie("access_token");
            const token:string = await this.apiService.getAccessToken(req.query.code as string);
            res.cookie('access_token',token,{httpOnly:true});
            res.redirect('/user');
        }
        else{
            res.end();
        }
    }

    @Post('repo')
    async createGithubRepo(@Req() req:Request){
        return this.apiService.createGithubRepo(req.body.repoName, req.cookies.access_token);
    }
   
}
