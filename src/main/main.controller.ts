/* eslint-disable prettier/prettier */
import { Controller, Get, Req, Res, Post} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('')
export class MainController {

  @Get('login')
  getLoginPage(@Req() req:Request, @Res() res:Response) {
    if(req.cookies.access_token==null)
      res.sendFile('login.html',{ root: './static'});
    else
      res.redirect('/user');
  }

  @Get('user')
  getUserPage(@Req() req:Request ,@Res() res:Response) {
    console.log('req cookie',req.cookies);
    return res.sendFile('form.html',{ root: './static'})
  }

  @Get('logout')
  async logout(@Res() res:Response){
    res.clearCookie('access_token');
    res.redirect('login');
  }

}
