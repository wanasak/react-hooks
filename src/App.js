import React, { useState, useEffect } from 'react';

const App = () => {
  const [news, setNews] = useState([]);
  const [searchQuery, setsearchQuery] = useState('react');
  const [url, setUrl] = useState(
    `http://hn.algolia.com/api/v1/search?query=${searchQuery}`
  );
  const [loading, setLoading] = useState(false);

  const fetchNews = () => {
    setLoading(true);
    fetch(url)
      .then(result => result.json())
      .then(data => setNews(data.hits))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchNews();
  }, [url]);

  const handleChange = e => {
    setsearchQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`);
  };

  const showLoading = () => (loading ? <h2>Loading...</h2> : null);

  const showNews = () => news.map((n, i) => <p key={i}>{n.title}</p>);

  return (
    <div>
      <h2>News</h2>
      {showLoading()}
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchQuery} onChange={handleChange} />
        <button>Search</button>
      </form>
      {showNews()}
    </div>
  );
};

export default App;
