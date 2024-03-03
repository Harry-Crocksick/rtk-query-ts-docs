import AddPostForm from "./components/AddPostForm";
import Navigation from "./components/Navigation";
import PostsList from "./components/PostsList";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <section>
      <Navigation />
      <AddPostForm />
      <div className="flex">
        <PostsList />
        <Outlet />
      </div>
    </section>
  );
}

export default App;
