import {
    Link,
    useResolvedPath,
    useMatch
} from 'react-router-dom';

function NavLink({ children, to, ...props }) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
  
    return (
      <div>
        <Link
          className={`${match ? "text-white": "text-gray-500"} block py-2 pr-4 pl-3 md:hover:text-violet-400 md:p-0`}
          to={to}
          {...props}
        >
          {children}
        </Link>
      </div>
    );
}

export default NavLink;