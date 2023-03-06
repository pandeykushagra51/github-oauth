/* eslint-disable prettier/prettier */
import {  Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as querystring from 'querystring';
import { config } from 'config';

@Injectable()
export class ApiService {
    async getAccessToken( temporaryCode:string ) {
        const url = await this.getUrl(temporaryCode);

        const data = await axios({
            method: 'post',
            url: url,
            headers: {
                Accept:'application/json',
                'User-Agent':'pandeykushagra51',
            }
        })
        .then((axiosResponse)=> axiosResponse.data)
        .catch((err)=>{
            console.log(err);
            return err;
        });

        return data.access_token;

    }

    async createGithubRepo( repoName:string, access_token:string ) {
        
        const data1 = await axios({
            method: 'post',
            url: `https://api.github.com/repos/${config.TEMPLATE_OWNER}/${config.TEMPLATE_REPO}/generate`,
            headers: {
                Accept:'application/json',
                'User-Agent':'pandeykushagra51',
                Authorization:`Bearer ${access_token}`,
            },
            data: {"name":repoName,"description":"This is your first code repository","include_all_branches":false,"private":false},
        })
        .then((axiosResponse)=> axiosResponse.data)
        .catch((err)=>{

            console.log(err);

            if(err.response){
                if(err.response.status==401)
                    throw new UnauthorizedException();
                else
                    throw new HttpException(err.response.data.errors,err.response.status);
            }
            throw new HttpException('unable to connect to github',HttpStatus.INTERNAL_SERVER_ERROR);
        });
        return data1;
    }

    async getUrl(data:string){
        const rootUrl = 'https://github.com/login/oauth/access_token';
        const options = {
            client_id: config.GITHUB_CLIENT_ID,
            client_secret: config.GITHUB_CLIENT_SECRET,
            code:data,
            scope: 'repo'
        };
    
        return `${rootUrl}?${querystring.stringify(options)}`;
    }
}
