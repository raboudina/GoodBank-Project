
# GoodBank API

This API allows users to create and login to their bank accounts, as well as perform transactions such as depositing and withdrawing money.

## Create account

To create a new bank account, you need to send a request to the `/create:name/:emal/:password/:balance` endpoint with your personal information and initial balance in the request body. The response will contain a JSON object with the `_id` field, which is a unique identifier for your account.

### Failure messages:
 - "User already exists"

Example request 1:

```bash
curl http://ec2-44-231-181-13.us-west-2.compute.amazonaws.com/create/"Alice Smith"/"alice@example.com"/"secretPass"/1000
```
Example response 1:

```json
 {
 "success":true,
 "user":{
    "name":"Alice Smith",
    "email":"alice@example.com",
    "password":"$2b$10$XGaKGf4cyG6RTtiaB7enIuWO4CVBzX
                    dcP331u7PiTu/qrGo/LJ8rO",
    "balance":"1000",
    "_id":"64962e96ff45fa06a8dee97b"
    } 
 }
```
Example request 2:

```bash
curl http://ec2-44-231-181-13.us-west-2.compute.amazonaws.com/create/"Alice Smith"/"alice@example.com"/"secretPass"/1000
```

Example response 21:

```json
{
    "success":false,
    "message":"User already exists"
}
```

## Login

To login to an account, you need to send a request to the `/login/:email/:password` endpoint with the email and password. The response will contain a JSON object with a stuatus, success or failure, user information in case of success, and message in case of failure.

### Failure messages:
 - "Login failed: user not found"
 - "Login failed: wrong password"

Example request 1:

```bash
curl http://ec2-44-231-181-13.us-west-2.compute.amazonaws.com/login/"alice@example.com"/"secretPass"
```

Example response 1:

```json
 { 
    "success":true,
    "user":{
        "_id":"64962e96ff45fa06a8dee97b",
        "name":"Alice Smith",
        "email":"alice@example.com",
        "password":"$2b$10$XGaKGf4cyG6RTtiaB7enIuWO4CVBzXdcP331u7PiTu/qrGo/LJ8rO",
        "balance":1500} 
}
```

Example request 2:

```bash
curl http://ec2-44-231-181-13.us-west-2.compute.amazonaws.com/login/"alice@example.com"/"secretPass2"
```

Example response 2:

```json
  {"success":false,"message":"Login failed: wrong password"}
```

Example request 3:

```bash
curl http://ec2-44-231-181-13.us-west-2.compute.amazonaws.com/login/"alice22222@example.com"/"secretPass2"
```

Example response 3:

```json
 {"success":false,"message":"Login failed: user not found"}
```
## Update balance

To update your balance, you need to send a request to the `/update/:email/:balance` endpoint with the email and new balance after transaction. The response will contain a JSON object with the updated `balance` field.

Example request:

```bash
curl http://ec2-44-231-181-13.us-west-2.compute.amazonaws.com/update/"alice@example.com"/1500
```

Example response:

```json
{
  "balance": 1500
}
```
