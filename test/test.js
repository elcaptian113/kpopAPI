let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require("../app");
const res = require('express/lib/response');

var expect = chai.expect;
var should = chai.should();
chai.use(chaiHttp);

describe('Unit tests for KPOP API', () =>{


    describe("Get endpoint", () => {
        it("it should GET all the Groups", (done) =>{
            chai.request(server)
            .get("/groups")
            .end((err, response) =>{
                response.should.have.status(200);
                response.body.should.be.a('array');
                done();
            });
        });

        it("it should NOT GET all the Groups", (done) =>{
            chai.request(server)
            .get("/group")
            .end((err, response) =>{
                response.should.have.status(404);
                done();
            });
        });
    });

    describe("Test the getById function", () =>{
        it("it should GET groups by ID", (done) =>{
            const groupId = 5;
            chai.request(server)
            .get("/groups/" + groupId)
            .end((err, response) =>{
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('id');
                response.body.should.have.property('name');
                response.body.should.have.property('short_name');
                response.body.should.have.property('korean_name');
                response.body.should.have.property('debut');
                response.body.should.have.property('company');
                response.body.should.have.property('current_members');
                response.body.should.have.property('original_members');
                response.body.should.have.property('fanclub_name');
                response.body.should.have.property('active');
                response.body.should.have.property('gender');
                response.body.should.have.property('id').eq(5);
                done();
            });
        });

        it("it should NOT GET a group by ID", (done) =>{
            const groupId = 3500;
            chai.request(server)
            .get("/groups/" + groupId)
            .end((err, response) =>{
                response.should.have.status(400);
                done();
            });
        });
    });

    describe("Test the create function", () => {
        it("it should POST a new Group", (done) => {
            const groups = {
                name: "TestGroup",
                short_name: "TG",
                korean_name: "테스트 그룹",
                debut: "2023-12-04",
                company: "TG Ent",
                current_members: 6,
                original_members: 6,
                fanclub_name: "TTG",
                active: "yes",
                gender: "M"
            }
            chai.request(server)
            .post("/groups")
            .send(groups)
            .end((err, response) =>{
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('name').eq("TestGroup");
                response.body.should.have.property('short_name').eq("TG");
                response.body.should.have.property('korean_name').eq("테스트 그룹");
                response.body.should.have.property('debut').eq("2023-12-04");
                response.body.should.have.property('company').eq("TG Ent");
                response.body.should.have.property('current_members').eq(6);
                response.body.should.have.property('original_members').eq(6);
                response.body.should.have.property('fanclub_name').eq("TTG");
                response.body.should.have.property('active').eq("yes");
                response.body.should.have.property('gender').eq("M");
                done();
            });
        });
    });
});