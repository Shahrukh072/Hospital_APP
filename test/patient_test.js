const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


//Assertion style 
chai.should();
chai.use(chaiHttp);


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWI2NmQ2ZWE5M2U4NjIzMmM0YzEyOTQiLCJlbWFpbCI6ImFiY0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCR0VFk1MzFsSkRXV0dITTFRMjA0UTVlUWNCejgvLmwzWVVwdTZyTms2VnA0aGpyVjQxLkdlSyIsIm5hbWUiOiJhYmMiLCJfX3YiOjAsImlhdCI6MTU4OTAxNDg1NiwiZXhwIjoxNTg5MDI0ODU2fQ.NSASGJItYeTte7BRg_AKUtswnVAYnHtDa2XSsOQq0-c';


// test for creating patient
describe('Patient routes', () => {
    describe("POST api/v1/patients/register_patient", () => {
        it("Returns new patient", (done) => {
            const patient = {
                number: 122,                     //patient number
            }

            chai.request(server)
                .post("api/v1/patients/register_patient")//request
                .set('Content-type', 'Application.json')
                .set({'Authorization':  'bearer ' + token})//token for authourization
                .send(patient)
                .end((err, res) => {
                    res.should.have.status(200);//checks
                    res.body.patient.should.have.property('number');
                done();
                })
        })
    })

    //create report test
    describe("POST api/v1/patients/:id/create_report", () => {
        it("Create new report", done => {
           
            const reportId = {
                id: "5eb69adb8466544604d8282b" //patient id
            }
            chai.request(server)
                .post(`api/v1//patients/${reportId.id}/create_report`) //request
                .set('content-type', 'application.json')
                .set({'Authorization':  'bearer ' + token})//token for authourization
                .send(reportBody)
                .end((err, res) => {
                    res.should.have.status(200);//checks
                    res.body.report.should.have.property('status');
                    res.body.report.should.have.property('doctor');
                    res.body.report.should.have.property('patient');
                done();
                })
        })
    })

    //test for getting all reports
    describe("POST api/v1//patients/:id/all_reports", () => {
        it("Returns all the Reports", done => {
            const reportId = {
                id: "5eb69adb8466544604d8282b" //patient id
            }
            chai.request(server)
                .get(`api/v1//patients/${reportId.id}/all_reports`) //request
                .set({'Authorization':  'bearer ' + token})//add token for authourization
                .end((err, res) => {
                    res.should.have.status(200);//checks
                    res.body.reports.should.be.a('array');
                    res.body.reports[0].should.have.property('status');
                    res.body.reports[0].should.have.property('doctor');
                    res.body.reports[0].should.have.property('patient');
                done();
                })
        })
    })
})
