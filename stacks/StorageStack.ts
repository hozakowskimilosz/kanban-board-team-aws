import { Api, StackContext, Table, Bucket } from "sst/constructs"

export function StorageStack({stack}: StackContext){
  const bucket = new Bucket(stack, 'Uploads')
  const table = new Table(stack, "Tasks", {
    fields: {
      id: "string",
      name: "string",
      description: "string",
      columnId: "number",
      order: "number",
    },
    primaryIndex: { partitionKey: "id" },
  });

  return {
    table: table,
    bucket: bucket
  };
}
