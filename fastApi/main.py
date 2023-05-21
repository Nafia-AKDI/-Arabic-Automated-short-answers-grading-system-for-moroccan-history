from fastapi import FastAPI
from strawberry.asgi import GraphQL
import strawberry
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import models.ready_model as ready_model


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@strawberry.type
class Question:
    id: str
    answer: str
    score: int
    
questions: List[Question] = [
    
]

@strawberry.type
class Query:
    @strawberry.field
    def questions(self) -> List[Question]:
        return questions
    
@strawberry.type
class Mutation:
    @strawberry.mutation
    def create_question(self, id: str, answer: str) -> List[Question]:
        if(id=="1"):
            questions.clear()  
        score=ready_model.predict(answer, id)
        questions.append(Question(id=id, answer=answer, score=score))
        return questions
    
schema = strawberry.Schema(query=Query, mutation=Mutation)

graphql_app = GraphQL(schema)
app.add_route("/graphql", graphql_app)
app.add_websocket_route("/graphql", graphql_app)