import React, { useCallback, useContext, useState } from "react";
import styled from "styled-components";
import PlayerQueueItem from "./PlayerQueueItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import { playSong, setPlayerStatus } from "../store/reducers/playListSlice";
import PlayerContext from "../lib/context";
import { SongState } from "../utils/types";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const QueueContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #000000;
  color: #ffffff;

  @media (max-width: 900px) {
    height: auto;
    flex: 1;
    overflow: visible;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  padding: 0 16px;
  margin-bottom: 16px;

  @media (max-width: 900px) {
    justify-content: space-around;
    gap: 0;
  }
`;

const Tab = styled.div<{ active?: boolean }>`
  padding: 12px 0;
  font-size: 14px;
  font-weight: 500;
  color: ${({ active }) => (active ? "#ffffff" : "#aaaaaa")};
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #ffffff;
  }
`;

const PlayingFromHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  margin-bottom: 16px;
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;

  .subtitle {
    font-size: 12px;
    color: #aaaaaa;
    margin-bottom: 4px;
  }

  .title {
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
  }
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: #ffffff;
  color: #030303;
  border: none;
  border-radius: 16px;
  padding: 6px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  svg {
    font-size: 20px;
  }

  &:hover {
    background-color: #e5e5e5;
  }
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
  margin-bottom: 16px;

  .scroll-icon {
    color: #aaaaaa;
    cursor: pointer;
    padding: 0 4px;
    &:hover {
      color: #ffffff;
    }
  }

  @media (max-width: 900px) {
    .scroll-icon {
      display: none;
    }
  }
`;

const ChipsContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 0 8px;
  flex: 1;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Chip = styled.div<{ active?: boolean }>`
  background-color: ${({ active }) => (active ? "#ffffff" : "#212121")};
  color: ${({ active }) => (active ? "#030303" : "#ffffff")};
  border: 1px solid ${({ active }) => (active ? "#ffffff" : "#333333")};
  padding: 6px 16px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ active }) => (active ? "#ffffff" : "#3d3d3d")};
  }
`;

const PlayerQueueStyled = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 6px;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: #606060;
    }
  }

  @media (max-width: 900px) {
    overflow-y: visible;
    flex: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const FILTERS = ["All", "Discover", "Chill", "Downbeat", "Romance"];

const PlayerQueue = () => {
  const dispatch = useDispatch();
  const songPlayer = useContext(PlayerContext);
  const [activeTab, setActiveTab] = useState("UP NEXT");
  const [activeFilter, setActiveFilter] = useState("All");
  const [songHovered, setSongHovered] = useState("");

  const { playerStatus, playList, selectedSong } = useSelector(
    (state: RootState) => {
      return {
        playerStatus: state.playList.status,
        playList: state.playList.playList,
        selectedSong: state.playList.selectedSong,
      };
    }
  );

  const playHandler = useCallback(
    (id: string) => {
      if (selectedSong && selectedSong.id === id) {
        if (playerStatus === "PAUSE") {
          dispatch(setPlayerStatus(SongState.Listening));
          songPlayer.replay();
          return;
        }

        if (playerStatus === "LISTENING") {
          dispatch(setPlayerStatus(SongState.Pause));
          songPlayer.pauseSong();
          return;
        }

        if (playerStatus === "IDLE") {
          dispatch(setPlayerStatus(SongState.Listening));
          dispatch(
            playSong(id, () => {
              songPlayer.playSong(id);
            })
          );
          return;
        }
      } else {
        if (playerStatus === "IDLE") {
          dispatch(setPlayerStatus(SongState.Listening));
          dispatch(
            playSong(id, () => {
              songPlayer.playSong(id);
            })
          );
          return;
        }

        if (playerStatus === "LISTENING") {
          songPlayer.pauseSong();
          dispatch(
            playSong(id, () => {
              songPlayer.playSong(id);
            })
          );
          return;
        }

        if (playerStatus === "PAUSE") {
          dispatch(setPlayerStatus(SongState.Listening));
          dispatch(
            playSong(id, () => {
              songPlayer.playSong(id);
            })
          );
          return;
        }
      }
    },
    [dispatch, playerStatus, selectedSong, songPlayer]
  );

  const mouseEnterHandler = (id: string) => {
    setSongHovered(id);
  };

  const mouseLeaveHandler = () => {
    setSongHovered("");
  };

  const getSelectedSong = (songId: string) => {
    return selectedSong ? songId === selectedSong.id : false;
  };

  const isSongHovered = (songId: string) => {
    return songId === songHovered;
  };

  return (
    <QueueContainer>
      <TabsContainer>
        {["UP NEXT", "LYRICS", "RELATED"].map((tab) => (
          <Tab
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Tab>
        ))}
      </TabsContainer>

      <PlayingFromHeader>
        <HeaderText>
          <span className="subtitle">Playing from</span>
          <span className="title">Hoyto Tomari Janya Mix</span>
        </HeaderText>
        <SaveButton>
          <PlaylistAddIcon />
          Save
        </SaveButton>
      </PlayingFromHeader>

      <FilterSection>
        <ChevronLeftIcon className="scroll-icon" />
        <ChipsContainer>
          {FILTERS.map((filter) => (
            <Chip
              key={filter}
              active={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Chip>
          ))}
        </ChipsContainer>
        <ChevronRightIcon className="scroll-icon" />
      </FilterSection>

      <PlayerQueueStyled>
        {playList.map((song) => (
          <PlayerQueueItem
            hovered={isSongHovered(song.id)}
            playHandler={playHandler}
            mouseEnterHandler={() => mouseEnterHandler(song.id)}
            mouseLeaveHandler={mouseLeaveHandler}
            selected={getSelectedSong(song.id)}
            key={song.id}
            id={song.id}
            albumImage={song.albumImage}
            songName={song.songName}
            artist={song.artist}
            duration={song.duration}
          />
        ))}
      </PlayerQueueStyled>
    </QueueContainer>
  );
};

export default PlayerQueue;
