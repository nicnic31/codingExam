import React, { useState } from "react";
import '../styles/Articles.css';

export default function Articles() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const dateToday = month + "-" + day + "-" + year;
  console.log(dateToday);
  const [createClick, setCreateClick] = useState(false);
  const [showClick, setShowClick] = useState(false);
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState({
    date: dateToday,
    title: "",
    body: "",
  });
  const [editClick, setEditClick] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState({
    index: 0,
    article: {
      date: dateToday,
      title: "",
      body: "",
    },
  });

  const handleSubmit = (e) => {
    if (article.title && article.body) {
      let newArticles = [...articles];
      newArticles.unshift(article);
      setArticles(newArticles);
      setArticle((prev) => ({ ...prev, title: "", body: "" }));
    } else {
      alert("INVALID INFORMATION");
    }
    e.preventDefault();
  };

  const handleDelete = (articleIndex) => {
    const newArrArticles = articles.filter(
      (article, index) => index !== articleIndex
    );
    setArticles(newArrArticles);
  };

  const handleEditBtn = (article, index) => {
    setSelectedArticle((prev) => ({ ...prev, index, article }));
  };

  const handleEditSubmit = (e) => {
    if(selectedArticle.article.title && selectedArticle.article.body){
        let newArticles = articles;
        newArticles[selectedArticle.index] = selectedArticle.article;
        console.log("UPDATED ARRAY", newArticles);
        setArticles(newArticles);
    } else {
        alert("INVALID INPUT")
    }
    setEditClick(false);
    e.preventDefault();
  };

  console.log("Articles", articles);
  console.log("SELECTED ARTICLE", selectedArticle);

  return (
    <div className="articles-container">
      <div>
        <br />
        <button onClick={() => setCreateClick(!createClick)} className="article-btns">
          Create Article
        </button>
        <br />
        <button onClick={() => setShowClick(!showClick)} className="article-btns">Show Article</button>
      </div>

      {createClick && (
        <div>
          <h1>Create Article</h1>
          <br />
          <br />
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="date">Title: </label>
                <span />
                <input
                  id="title"
                  name="title"
                  type="text"
                  onChange={(e) => {
                    setArticle((prev) => ({ ...prev, title: e.target.value }));
                  }}
                  value={article.title}
                />
              </div>
              <br />

              <div>
                <label htmlFor="date">Content: </label>
                <span />
                <input
                  id="body"
                  name="body"
                  type="text"
                  onChange={(e) => {
                    setArticle((prev) => ({ ...prev, body: e.target.value }));
                  }}
                  value={article.body}
                />
              </div>
              <br />

              <button type="submit">Post</button>
            </form>
          </div>
          <br />
        </div>
      )}

      {showClick && (
        <div>
          <h1>Articles</h1>
          <br />
          {articles.length ? (
            articles.map((article, index) => {
              return (
                <div key={index}>
                  <h2>{article.title}</h2>
                  <p>{article.date}</p>
                  <p>{article.body}</p>
                  <br />

                  <div>
                    <button
                      onClick={() => {
                        setEditClick(!editClick);
                        handleEditBtn(article, index);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(index);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <h4>No Articles Yet</h4>
          )}

          {editClick && (
            <div>
              <h1>Edit Article</h1>
              <br />
              <div>
                <form onSubmit={handleEditSubmit}>
                  <div>
                    <label htmlFor="title">Title: </label>
                    <span />
                    <input
                      id="title"
                      name="title"
                      type="text"
                      onChange={(e) => {
                        setSelectedArticle((prev) => ({
                          ...prev,
                          article: { ...prev.article, title: e.target.value },
                        }));
                      }}
                      value={selectedArticle.article.title}
                    />
                  </div>
                  <br />
                  <div>
                    <label htmlFor="body">Body: </label>
                    <span />
                    <input
                      id="body"
                      name="body"
                      type="text"
                      onChange={(e) => {
                        setSelectedArticle((prev) => ({
                          ...prev,
                          article: { ...prev.article, body: e.target.value },
                        }));
                      }}
                      value={selectedArticle.article.body}
                    />
                  </div>
                  <br />

                  <button type="submit">Update</button>
                </form>
                <br />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
