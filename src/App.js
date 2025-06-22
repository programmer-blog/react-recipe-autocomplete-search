import { useEffect, useState, useRef } from "react";
import "./index.css";

export default function App() {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const resultsRef = useRef(null);

  const fetchData = async (query) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://dummyjson.com/recipes/search?q=${query}&limit=30`
      );
      const data = await response.json();
      setResults(data.recipes || []);
    } catch (err) {
      setError("Failed to fetch recipes");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => fetchData(input), 300);
    return () => clearTimeout(timer);
  }, [input]);

  const handleKeyDown = (e) => {
    if (!showResults || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex(prev =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        if (activeIndex >= 0) {
          setInput(results[activeIndex].name);
          setShowResults(false);
        }
        break;
      case "Escape":
        setShowResults(false);
        break;
    }
  };

  useEffect(() => {
    if (activeIndex >= 0 && resultsRef.current) {
      const activeItem = resultsRef.current.children[activeIndex];
      activeItem?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  return (
    <div className="autocomplete-container">
      <h1>Recipe Finder - ReactJS</h1>
      <div className="search-box">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setActiveIndex(-1);
            setShowResults(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          placeholder="Search for recipes..."
          aria-label="Search recipes"
        />
        {isLoading && <div className="spinner"></div>}
      </div>

      {showResults && (
        <div className="results-dropdown" ref={resultsRef}>
          {error ? (
            <div className="error-message">{error}</div>
          ) : results.length === 0 && input ? (
            <div className="no-results">No recipes found</div>
          ) : (
            results.map((recipe, index) => (
              <div
                key={recipe.id}
                className={`result-item ${index === activeIndex ? "active" : ""}`}
                onMouseDown={() => {
                  setInput(recipe.name);
                  setShowResults(false);
                }}
              >
                <span className="recipe-name">{recipe.name}</span>
                <span className="recipe-time">{recipe.cookTimeMinutes} min</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}