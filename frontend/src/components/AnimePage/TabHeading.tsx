const TabHeading = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="mt-2 mb-8">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-500">{subtitle}</p>
    </div>
  );
};

export default TabHeading;
