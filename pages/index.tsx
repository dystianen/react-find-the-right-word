import { useEffect, useState } from 'react';

interface dataResult {
  title: string;
  desc: string;
}

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<dataResult[]>();
  const [isHighlight, setIsHighlight] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      findTheWord(input);
    }, 1000);
  }, [input]);

  const data = [
    {
      title: 'Test 1',
      desc: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,',
    },
    {
      title: 'Lorem 2',
      desc: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.',
    },
    {
      title: 'Lorem 3',
      desc: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
    },
  ];

  function Highlighted({ title, desc, highlight }: any) {
    // Split on highlight term and include term into parts, ignore case
    const partsTitle = title.split(new RegExp(`(${highlight})`, 'gi'));
    const partsDesc = desc.split(new RegExp(`(${highlight})`, 'gi'));

    console.log({ isHighlight });

    return (
      <div className='text-black'>
        {partsTitle.map((title: string, i: number) => (
          <span key={i} className={isHighlight && title.toLowerCase() === highlight.toLowerCase() ? 'bg-red-500' : ''}>
            {title}
          </span>
        ))}
        <br />
        {partsDesc.map((desc: string, i: number) => (
          <span key={i} className={isHighlight && desc.toLowerCase() === highlight.toLowerCase() ? 'bg-red-500' : ''}>
            {desc}
          </span>
        ))}
      </div>
    );
  }

  function findTheWord(word: string) {
    const res = data.filter((it) => {
      return it.title.toLocaleLowerCase().includes(word) || it.desc.toLocaleLowerCase().includes(word);
    });

    if (input) {
      setIsHighlight(true);
    } else {
      setIsHighlight(false);
    }
    setResult(res);
  }

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <input className='rounded-sm focus:outline-none p-2 text-black' placeholder='Search...' onChange={(e: any) => setInput(e.target.value)} />

      <div className='flex flex-col gap-4 mt-5'>
        {result?.length ? (
          result.map((it, index) => (
            <div key={index} className='bg-white text-black w-[600px] rounded-lg p-4'>
              <Highlighted title={it.title} desc={it.desc} highlight={input} />
            </div>
          ))
        ) : (
          <p className='text-white'>No Data</p>
        )}
      </div>
    </main>
  );
}
