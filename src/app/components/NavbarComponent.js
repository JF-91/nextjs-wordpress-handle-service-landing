import { gql } from "@apollo/client";
import client from "client";

export default async function Home() {
  const { data } = await client.query({
    query: gql`
     query GetPages {
        pages {
          nodes {
            title
            slug
          }
        }
      }
    `,
  });

    return (
        <div>
            <ul>
            {data?.pages.nodes.map((page) => (
                <li key={page.slug}>
                <a href={`/${page.slug}`}>{page.title}</a>
                </li>
            ))}
            </ul>
        </div>
        );
}