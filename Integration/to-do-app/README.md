### Start local dynamodb 
> java -D"java.library.path=./DynamoDBLocal_lib" -jar DynamoDBLocal.jar

### Verify local dynamodb
> aws dynamodb list-tables --endpoint-url http://localhost:8000