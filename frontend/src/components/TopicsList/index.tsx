import { TopicType } from '@/types/topics';
import { OutlineButton } from '@/components/common/Button';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDroprightCircle, IoMdClose } from 'react-icons/io';
import { Popup } from '@/components/common/Popup';
import { useUser } from '@/context/currentUserContext';
import { createTopic } from '@/api/topics/createTopic'; // Importa a função createTopic
import { deleteTopic } from '@/api/topics/deleteTopic'; // Importa a função deleteTopic

type TopicsListProps = {
    topics: TopicType[];
};

interface AddNewTopicProps {
    topicsList: TopicType[];
    setTopicsList: React.Dispatch<React.SetStateAction<TopicType[]>>;
    setIsAddingNewTopic: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TopicsList = ({ topics }: TopicsListProps) => {
    const { currentUser } = useUser(); // Assumindo que `userRole` está disponível aqui
    if (!currentUser) return null; // ou um componente de carregamento

    const [topicsList, setTopicsList] = useState<TopicType[]>(topics);
    const [isAddingNewTopic, setIsAddingNewTopic] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const firstTopics = topicsList.slice(0, 6);

    const handleDeleteTopic = async (topicId: number) => {
        try {
            await deleteTopic(topicId); // Deleta o tópico no banco de dados
            setTopicsList(topicsList.filter(topic => topic.topicId !== topicId)); // Atualiza a lista de tópicos no estado
        } catch (error) {
            console.error('Error deleting topic:', error);
        }
    };

    return (
        <div className='flex flex-col gap-2'>
            <ul className='divide-y'>
                {firstTopics.map((singleTopic: TopicType, i: number) => (
                    <li className='py-4 flex justify-between items-center' key={i}>
                        <Link to={'/topicos/' + singleTopic.topicUrl}>{singleTopic.topicName}</Link>
                        {currentUser.userRole === 'admin' &&
                            <IoMdClose 
                                onClick={() => handleDeleteTopic(singleTopic.topicId)} 
                                className='text-xl cursor-pointer text-red-600' 
                            />
                        }
                    </li>
                ))}
            </ul>

            {topicsList.length > 6 &&
                <span className='mb-4 cursor-pointer' onClick={() => setIsPopupOpen(true)}>Ver todos os tópicos</span>
            }

            {isAddingNewTopic && <AddNewTopicInput topicsList={topicsList} setTopicsList={setTopicsList} setIsAddingNewTopic={setIsAddingNewTopic} />}

            {currentUser.userRole === 'admin' && !isAddingNewTopic &&
                <OutlineButton onClick={() => setIsAddingNewTopic(true)}>+ Adicionar tópico</OutlineButton>
            }

            <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                <ul className='divide-y'>
                    {topicsList.map((singleTopic: TopicType, i: number) => (
                        <li className='py-4 flex justify-between items-center' key={i}>
                            <Link to={'/topicos/' + singleTopic.topicUrl}>{singleTopic.topicName}</Link>
                            {currentUser.userRole === 'admin' &&
                                <IoMdClose 
                                    onClick={() => handleDeleteTopic(singleTopic.topicId)} 
                                    className='text-xl cursor-pointer text-red-600' 
                                />
                            }
                        </li>
                    ))}
                </ul>
            </Popup>
        </div>
    );
};

const AddNewTopicInput = ({ topicsList, setTopicsList, setIsAddingNewTopic }: AddNewTopicProps) => {
    const [topicName, setTopicName] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const filterSpaceAndSpecialChars = (value: string, setFunction: React.Dispatch<React.SetStateAction<string>> | null = null): string => {
        const removeSpecialCharactersExceptAccents = (str: string) => str.replace(/[^a-zA-Z0-9\s\u00C0-\u00FF]/g, '');
        const removeDoubleSpaces = (str: string) => str.replace(/\s{2,}/g, ' ');
        const filteredValue = removeDoubleSpaces(removeSpecialCharactersExceptAccents(value));

        if (setFunction) {
            setFunction(filteredValue);
        }

        return filteredValue; // Garantindo que sempre retornamos uma string
    };

    const handleNewTopic = async (topicName: string) => {
        const removeAccents = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const formatTopicUrl = (str: string) => str.toLowerCase().replace(/\s+/g, '-');
        
        const cleanedTopicName = filterSpaceAndSpecialChars(topicName);
        const topicUrl = formatTopicUrl(removeAccents(cleanedTopicName));
    
        const topic: TopicType = {
            topicId:topicsList.length+1,
            topicName: cleanedTopicName,
            topicUrl: topicUrl
        };

        try {
            await createTopic(topic); // Adiciona o tópico no banco de dados
            setTopicsList([...topicsList, topic]); // Atualiza a lista de tópicos no estado
            setTopicName('');
            setIsAddingNewTopic(false);
        } catch (error) {
            console.error('Error adding topic:', error);
        }
    };

    return (
        <div className='flex mb-4 border border-neutral-400 outline-none rounded-md py-4 justify-end'>
            <div className='flex gap-2 w-full items-center justify-between pr-4'>
                <input 
                    placeholder={'Insira o novo tópico '} 
                    className='w-12/12 bg-transparent placeholder:to-zinc-100 outline-none px-2 ' 
                    value={topicName} 
                    onChange={(e) => setTopicName(filterSpaceAndSpecialChars(e.target.value))}
                    maxLength={20}
                    ref={inputRef}
                    onKeyDown={(e) => e.key === 'Enter' && handleNewTopic(topicName)}
                />
                <IoIosArrowDroprightCircle onClick={() => handleNewTopic(topicName)} className='text-2xl cursor-pointer'/>
            </div>
            <div className='flex absolute'>
                <span className='font-bold -mt-8 -mr-1 z-50 cursor-pointer text-xl' onClick={() => setIsAddingNewTopic(false)}>x</span>
            </div>
        </div>
    );
};
