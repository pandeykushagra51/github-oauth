/* eslint-disable prettier/prettier */
import {  Injectable, UnauthorizedException, HttpException, HttpStatus, UnprocessableEntityException } from '@nestjs/common';
import axios from 'axios';
import * as querystring from 'querystring';

@Injectable()
export class ApiService {
    async getAccessToken( tempraryCode:string ) {
        const url = await this.getUrl(tempraryCode);

        const data = await axios({
            method: 'post',
            url: url,
            headers: {
                Accept:'application/json'
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
            url: 'https://api.github.com/repos/pandeykushagra51/C-Server/generate',
            headers: {
                Accept:'application/json',
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
            client_id: 'e6091bdbec940c89e8cb',
            client_secret: '3828704b49c265beb486f9ce78367d74a7b75c00',
            code:data,
            scope: 'repo'
        };
    
        return `${rootUrl}?${querystring.stringify(options)}`;
    }
}
