# Query Keys

At its core, Vue Query manages query caching for you based on query keys. Query keys can be as simple as a string, or as complex as an array of many strings and nested objects. As long as the query key is serializable, and `unique to the query's data`, you can use it!