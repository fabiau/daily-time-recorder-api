import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Component, Inject, ForbiddenException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { JWT_SECRET } from '../constants';
import { HttpException } from '@nestjs/core';

@Component()
export class JwtStrategy extends Strategy {
  constructor(private readonly authService: AuthService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: JWT_SECRET,
      },
      async (req, payload, next) => await this.verify(req, payload, next)
    );
    passport.use(this);
  }

  public async verify(req, payload, done) {
    const isValid = await this.authService.validateUser(payload);
    if (!isValid) {
      return done(new ForbiddenException(), false);
    }
    done(null, payload);
  }
}