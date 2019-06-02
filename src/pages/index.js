import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = ({ data }) => {
  const pages = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <SEO title="Галерея работ" />
      <div className="image-grid">
        {pages.map(({ node }) => (
          <div className="image-cell" key={node.fields.slug}>
            <Link to={node.fields.slug}>
              <img
                src={node.frontmatter.thumbnail.childImageSharp.resize.src}
              />
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};

const indexQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { type: { ne: "about" } } }
      sort: { order: ASC, fields: fields___slug }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            thumbnail {
              childImageSharp {
                resize(width: 250, height: 250) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => <IndexPage data={data} {...props} />}
  />
);