/**
 * Tests entry point
 */

import 'mocha';
import { expect } from 'chai';

import * as mdl from '../src';
import { ApplicationError } from '../src/application_error';
import { HttpError } from '../src/http_error';
import { MissingArgumentError } from '../src/missing_argument_error';
import { getDefaultErrorMessage, getEitherDefaultOrPredefinedErrorMessage } from '../src/util';


describe('SpeedUP|Standard-Error-Lib', () => {

    describe('integrity', () => {

        it('should contain 4 properties', () => {

            expect(mdl).to.be.an('object');
            expect(Object.keys(mdl)).to.have.lengthOf(4);
        });
    });

    describe('ERROR_BASE', () => {

        it('should throw E_NO_CONFIG exception', () => {

            expect(() => new ApplicationError()).throws('E_NO_CONFIG');
        });

        it('should use the default error message', () => {

            const appError = new ApplicationError({
                code: 'E_NOT_FOUND'
            });

            expect(appError)
                .to.have.property('code').that.is.a('string').which.is.eq('E_NOT_FOUND');
            expect(appError)
                .to.have.property('message').that.is.a('string').which.is.eq('Error \'E_NOT_FOUND\' has been occurred.');
        });

        it('should use the inherited error message', () => {

            const appError = new ApplicationError({
                code: 'E_NOT_FOUND',
                error: new ApplicationError({
                    code: 'E_INHERITED'
                })
            });

            expect(appError)
                .to.have.property('code').that.is.a('string').which.is.eq('E_NOT_FOUND');
            expect(appError)
                .to.have.property('message').that.is.a('string').which.is.eq('Error \'E_INHERITED\' has been occurred.');
        });

        it('should use the inherited error message', () => {

            const appError = new ApplicationError({
                code: 'E_NOT_FOUND',
                error: new ApplicationError({
                    code: 'E_INHERITED'
                }),
                message: 'NOT FOUND'
            });

            expect(appError)
                .to.have.property('code').that.is.a('string').which.is.eq('E_NOT_FOUND');
            expect(appError)
                .to.have.property('message').that.is.a('string').which.is.eq('NOT FOUND');
        });
    });

    describe('ApplicationError', () => {

        it('should throw E_NO_CONFIG exception', () => {

            expect(() => new ApplicationError()).throws('E_NO_CONFIG');
        });

        it('should create an ApplicationError', () => {

            const appError = new ApplicationError({
                code: 'E_NOT_FOUND',
                message: 'Not Found'
            });

            expect(appError)
                .to.have.property('code').that.is.a('string').which.is.eq('E_NOT_FOUND');
            expect(appError)
                .to.have.property('message').that.is.a('string').which.is.eq('Not Found');
        });
    });

    describe('HttpError', () => {

        it('should throw E_NO_CONFIG exception', () => {

            expect(() => new HttpError()).throws('E_NO_CONFIG');
        });

        it('should create an HttpError', () => {

            const httpError = new HttpError({
                statusCode: 400,
                statusMessage: 'BAD_REQUEST',
                code: 'E_BAD_REQ',
                isHandled: true,
            });

            expect(httpError)
                .to.have.property('statusCode').that.is.a('number').which.is.eq(400);
            expect(httpError)
                .to.have.property('statusMessage').that.is.a('string').which.is.eq('BAD_REQUEST');
        });
    });

    describe('MissingArgumentError', () => {

        it('should throw E_NO_CONFIG exception', () => {

            expect(() => new MissingArgumentError()).throws('E_NO_CONFIG');
        });

        it('should create an MissingArgumentError', () => {

            const missingArgumentError = new MissingArgumentError({
                code: 'E_MISSING_ARG',
                argumentName: 'myArg',
                error: new ApplicationError({
                    code: 'E_NO_APP',
                    message: 'No Application Found'
                })
            });

            expect(missingArgumentError)
                .to.have.property('argumentName').that.is.a('string').which.is.eq('myArg');
            expect(missingArgumentError)
                .to.have.property('message').that.is.a('string').which.is.eq('\'myArg\' is not provided (null or undefined).');
        });
    });

    describe('Util', () => {

        describe('getDefaultErrorMessage', () => {

            it('should return default error message with string input', () => {

                expect(getDefaultErrorMessage('E_NOT_FOUND'))
                    .to.be.a('string')
                    .that.is.eq('Error \'E_NOT_FOUND\' has been occurred.');
            });

            it('should return default error message with number input', () => {

                expect(getDefaultErrorMessage(10095))
                    .to.be.a('string')
                    .that.is.eq('Error \'10095\' has been occurred.');
            });
        });

        describe('getEitherDefaultOrPredefinedErrorMessage', () => {

            it('should return the default message', () => {

                expect(getEitherDefaultOrPredefinedErrorMessage({ code: 'E_NOT_FOUND' }))
                    .to.be.a('string')
                    .that.is.eq('Error \'E_NOT_FOUND\' has been occurred.');
            });

            it('should return the inherited error message', () => {

                expect(getEitherDefaultOrPredefinedErrorMessage({ code: 'E_NOT_FOUND', error: new ApplicationError({ code: 'E_OVERWRITTEN' }) }))
                    .to.be.a('string')
                    .that.is.eq('Error \'E_OVERWRITTEN\' has been occurred.');
            });

            it('should return the inherited error message', () => {

                expect(getEitherDefaultOrPredefinedErrorMessage({ code: 'E_NOT_FOUND', error: new ApplicationError({ code: 'E_OVERWRITTEN' }), message: 'USE_THIS_MSG' }))
                    .to.be.a('string')
                    .that.is.eq('USE_THIS_MSG');
            });
        });
    });
});