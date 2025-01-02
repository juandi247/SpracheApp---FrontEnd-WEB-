import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Esto es necesario para aplicar los estilos de la librería
export function FlashcardSkeletonExpo() {
    return (
      <div className="animate-pulse">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="h-4 bg-gray-200 rounded w-1/4">
                <Skeleton width="100%" />
              </th>
              <th className="h-4 bg-gray-200 rounded w-1/4">
                <Skeleton width="100%" />
              </th>
              <th className="h-4 bg-gray-200 rounded w-1/4">
                <Skeleton width="100%" />
              </th>
              <th className="h-4 bg-gray-200 rounded w-1/4">
                <Skeleton width="100%" />
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td className="h-6 bg-gray-300 rounded mb-4">
                  <Skeleton width="100%" />
                </td>
                <td className="h-6 bg-gray-300 rounded mb-4">
                  <Skeleton width="100%" />
                </td>
                <td className="h-6 bg-gray-300 rounded mb-4">
                  <Skeleton width="100%" />
                </td>
                <td className="h-6 bg-gray-300 rounded mb-4">
                  <Skeleton width="100%" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  