import dynamic from 'next/dynamic';

// Dynamically import Home component with SSR disabled
const Home = dynamic(() => import('@/containers/Home'), { ssr: false });

const Page = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export default Page;
