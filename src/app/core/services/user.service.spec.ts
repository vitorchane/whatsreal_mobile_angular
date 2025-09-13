import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
    let service: UserService;
    let httpMock: HttpTestingController;

    const mockRawJson = `
        {
            "users": [
                {"id":"1","name":"Alice","email":"alice@example.com","age":30,"plan":{"type":"Premium","status":"Active","description":"Full","features":{"conferenceCalling":true,"callWaiting":true,"voicemail":false}}},
                {"id":"2","name":"Bob","email":"bob@example.com","age":25,"plan":{"type":"Basic","status":"Inactive","description":"Limited","features":{"conferenceCalling":false,"callWaiting":true,"voicemail":true}}}
            ]
        }
    `;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService]
        });

        service = TestBed.inject(UserService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should fetch and parse users', (done) => {
        service.getUsers().subscribe(users => {
            expect(users.length).toBe(2);
            expect(users[0].name).toBe('Alice');
            expect(users[1].plan.type).toBe('Basic');
            done();
        });

        const req = httpMock.expectOne('assets/data/db.json');
        expect(req.request.method).toBe('GET');

        req.flush(mockRawJson);
    });

    it('should return a user by ID', (done) => {
        service.getUserById('2').subscribe(user => {
            expect(user).toBeTruthy();
            expect(user?.name).toBe('Bob');
            expect(user?.plan.type).toBe('Basic');
            done();
        });

        const req = httpMock.expectOne('assets/data/db.json');
        req.flush(mockRawJson);
    });

    it('should return undefined for non-existing ID', (done) => {
        service.getUserById('999').subscribe(user => {
            expect(user).toBeUndefined();
            done();
        });

        const req = httpMock.expectOne('assets/data/db.json');
        req.flush(mockRawJson);
    });

    it('should fix invalid JSON', () => {
        const raw = `{
            "name":"Alice" "email":"alice@example.com"
        }`;
        
        const fixedCommas = (service as any).fixJson(raw);

        const parsed = JSON.parse(fixedCommas);
        expect(parsed.name).toBe('Alice');
        expect(parsed.email).toBe('alice@example.com');
    });
});
