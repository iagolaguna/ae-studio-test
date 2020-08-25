import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class HealthStatus {
  @Field()
  status: string
}
