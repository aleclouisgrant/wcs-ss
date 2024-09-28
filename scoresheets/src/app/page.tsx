"use client";

import { useEffect, useState } from "react";

const BASE_URL = 'http://localhost:3000';

interface CompetitionListEntity {
  name: string,
  date: string
}

function Home() {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [competitionList, setCompetitionList] = useState<CompetitionListEntity[]>([]);

  useEffect(() => {
    const fetchCompetitionList = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`${BASE_URL}/api/v0/competitions`);
        const list = await response.json() as CompetitionListEntity[];
        list.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
  
          if (dateA < dateB) {
            return -1;
          }
          else if (dateA > dateB){
            return 1;
          }
          else {
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
          }
        });
        setCompetitionList(list);
      }
      catch (e: any) {
        setError(e);
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchCompetitionList();
  }, []);

  if (isLoading) {
    return <div>Loading competition list...</div>;
  }

  if (error) {
    return <div>An error occurred while fetching the competition list.</div>;
  }

  return (
    <div>
      <h3>Competition List:</h3>
      <ul>
        {competitionList.map((entity) => {
          const date = new Date(entity.date);

          return (
            <li key={entity.name + entity.date}>
              {date.toLocaleDateString()} {entity.name}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Home;