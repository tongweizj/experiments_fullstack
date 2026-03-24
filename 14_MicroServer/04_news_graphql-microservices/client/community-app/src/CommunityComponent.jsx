import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const GATEWAY_URL = "http://localhost:4000/graphql";

const CommunityComponent = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [helpRequests, setHelpRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("posts"); // 'posts' or 'help'

  // Form states
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postCategory, setPostCategory] = useState("discussion");
  const [helpDesc, setHelpDesc] = useState("");
  const [helpLoc, setHelpLoc] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // 
  useEffect(() => {
    const getCurrentUser = async () => {
      const query = `
      query CurrentUser {
        currentUser {
          username
        }
      }
    `;
      const data = await fetchGraphQL(query);
      if (data?.currentUser) {
        setCurrentUser(data.currentUser.username);
      }
    };
    getCurrentUser();
  }, []);

  const fetchGraphQL = async (query, variables = {}) => {
    try {
      const response = await fetch(GATEWAY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ query, variables }),
      });
      const result = await response.json();
      if (result.errors) {
        console.error("GraphQL Errors:", result.errors);
        return null;
      }
      return result.data;
    } catch (err) {
      console.error("Fetch Error:", err);
      return null;
    }
  };

  const loadData = async () => {
    const data = await fetchGraphQL(`
      query GetCommunityData {
        communityPosts {
          id
          title
          content
          category
          author { username }
        }
        helpRequests {
          id
          description
          location
          isResolved
          author { username }
          volunteers { username }
        }
      }
    `);
    if (data) {
      setPosts(data.communityPosts || []);
      setHelpRequests(data.helpRequests || []);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const mutation = `
      mutation CreatePost($title: String!, $content: String!, $category: String!) {
        createCommunityPost(title: $title, content: $content, category: $category) {
          id
        }
      }
    `;
    const data = await fetchGraphQL(mutation, {
      title: postTitle,
      content: postContent,
      category: postCategory,
    });
    if (data) {
      setPostTitle("");
      setPostContent("");
      loadData();
    } else {
      alert("Failed to create post. Please make sure you are logged in.");
    }
  };

  const handleCreateHelp = async (e) => {
    e.preventDefault();
    const mutation = `
      mutation CreateHelp($desc: String!, $loc: String) {
        createHelpRequest(description: $desc, location: $loc) {
          id
        }
      }
    `;
    const data = await fetchGraphQL(mutation, { desc: helpDesc, loc: helpLoc });
    if (data) {
      setHelpDesc("");
      setHelpLoc("");
      loadData();
    } else {
      alert("Failed to request help. Please make sure you are logged in.");
    }
  };

  const handleVolunteer = async (id) => {
    const mutation = `
      mutation Volunteer($id: ID!) {
        volunteerForHelpRequest(id: $id) {
          id
        }
      }
    `;
    const data = await fetchGraphQL(mutation, { id });
    if (data) {
      loadData();
    } else {
      alert("Failed to volunteer. Please make sure you are logged in.");
    }
  };
  const handleLogout = async (e) => {
    const mutation = `
      mutation Mutation {
        logOut
      }
    `;
    const data = await fetchGraphQL(mutation, {});
    if (data) {
      // navigate("/");
      if (setIsLoggedIn) setIsLoggedIn(false);
      window.location.href = "/";
      console.log("logout:", data);
    } else {
      alert("Failed to logout. Please try again.");
    }
  };
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1>🌍 Community Hub</h1>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setActiveTab("posts")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: activeTab === "posts" ? "#007bff" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Community Posts
        </button>
        <button
          onClick={() => setActiveTab("help")}
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === "help" ? "#28a745" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Help Requests
        </button>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === "help" ? "#28a745" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          logout
        </button>
      </div>

      {activeTab === "posts" ? (
        <section>
          <h2>Create a Post</h2>
          <form
            onSubmit={handleCreatePost}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "30px",
            }}
          >
            <input
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              placeholder="Title"
              required
              style={{ padding: "8px" }}
            />
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Content"
              required
              style={{ padding: "8px" }}
            />
            <select
              value={postCategory}
              onChange={(e) => setPostCategory(e.target.value)}
              style={{ padding: "8px" }}
            >
              <option value="discussion">Discussion</option>
              <option value="news">News</option>
            </select>
            <button
              type="submit"
              style={{
                padding: "10px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
              }}
            >
              Post
            </button>
          </form>

          <h2>Latest Discussions</h2>
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "8px",
              }}
            >
              <span style={{ fontSize: "0.8em", color: "#666" }}>
                [{post.category.toUpperCase()}] By {post.author?.username}
              </span>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
          ))}
        </section>
      ) : (
        <section>
          <h2>Request Help</h2>
          <form
            onSubmit={handleCreateHelp}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "30px",
            }}
          >
            <textarea
              value={helpDesc}
              onChange={(e) => setHelpDesc(e.target.value)}
              placeholder="What do you need help with?"
              required
              style={{ padding: "8px" }}
            />
            <input
              value={helpLoc}
              onChange={(e) => setHelpLoc(e.target.value)}
              placeholder="Location (optional)"
              style={{ padding: "8px" }}
            />
            <button
              type="submit"
              style={{
                padding: "10px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
              }}
            >
              Request
            </button>
          </form>

          <h2>Help Needed</h2>
          {helpRequests.map((req) => (
            <div
              key={req.id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "8px",
                position: "relative",
              }}
            >
              <span style={{ fontSize: "0.8em", color: "#666" }}>
                Requested by {req.author?.username}{" "}
                {req.location && `• 📍 ${req.location}`}
              </span>
              <p style={{ fontSize: "1.2em", margin: "10px 0" }}>
                {req.description}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: req.isResolved ? "#28a745" : "#dc3545",
                    fontWeight: "bold",
                  }}
                >
                  {req.isResolved ? "✅ Resolved" : "⏳ Open"}
                </span>
                {/* {!req.isResolved && (
                  <button
                    onClick={() => handleVolunteer(req.id)}
                    style={{
                      padding: "5px 15px",
                      backgroundColor: "#17a2b8",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  >
                    Volunteer ({req.volunteers?.length || 0})
                  </button>
                )} */}
                {!req.isResolved && (
  <button
    onClick={() => handleVolunteer(req.id)}
    disabled={req.author?.username === currentUser}
    style={{
      padding: "5px 15px",
      backgroundColor: req.author?.username === currentUser ? "#ccc" : "#17a2b8",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: req.author?.username === currentUser ? "not-allowed" : "pointer",
    }}
  >
    {req.author?.username === currentUser 
      ? "Your Request" 
      : `Volunteer (${req.volunteers?.length || 0})`}
  </button>
)}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default CommunityComponent;
