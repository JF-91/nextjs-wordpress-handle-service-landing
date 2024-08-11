'use client';
import { gql } from "@apollo/client";

import client from "client";
import Head from "next/head";

import { parse } from '@wordpress/block-serialization-default-parser';
import { createElement } from '@wordpress/element';
import { renderToString } from 'react-dom/server';


export default async function Home() {

    const { data } = await client.query({
        query: gql`
        query GetPages {
            nodeByUri(uri: "/") {
            ... on Page {
                id
                content
                blocks
            }
            }
        }
        `,
    });
    
    const parsedBlocks = parse(data?.nodeByUri.content || '');
    
    // Renderizar bloques a HTML con estilos aplicados
    const renderBlocksToHTML = (blocks) => {
        return blocks.map((block, index) => {
        // Aquí, se renderiza cada bloque como un elemento React
        return renderToString(createElement(BlockListBlock, { key: index, block }));
        }).join('');
    };
    
    const htmlContent = renderBlocksToHTML(parsedBlocks);
    
    return (
        <div>

    
        {/* <div dangerouslySetInnerHTML={{ __html: data?.nodeByUri.content }} /> */}
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
    );
    }