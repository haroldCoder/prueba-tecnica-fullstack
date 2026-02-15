import { Spinner } from '@/common/components/ui/spinner';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

// Importar SwaggerUI dinámicamente para evitar problemas de SSR
const SwaggerUI = dynamic(() => import('swagger-ui-react'), {
  ssr: false,
  loading: () => (
    <div className='flex justify-center h-screen'>
      <Spinner />
    </div>
  ),
});

const ApiDocsPage = () => (
  <div className='min-h-screen bg-background'>
    <div className='container mx-auto py-8'>
      <h1 className='text-4xl font-bold mb-6 text-center'>
        Documentación de la API
      </h1>
      <div className='bg-card rounded-lg shadow-lg p-4'>
        <SwaggerUI url='/api/docs' />
      </div>
    </div>
  </div>
);

export default ApiDocsPage;
