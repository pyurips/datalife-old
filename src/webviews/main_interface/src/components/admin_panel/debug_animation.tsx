import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RequestNames, useRequester } from '@/utils/use_requester';
import {
  Request_player_setAnimationByStaff,
  Response_player_setAnimationByStaff,
} from '@/types/player';

export default function DebugAnimation() {
  const { fetch } = useRequester<
    Request_player_setAnimationByStaff,
    Response_player_setAnimationByStaff
  >(RequestNames.player_setAnimationByStaff, false);

  const [animation, setAnimation] = useState<{
    animDict: string;
    animName: string;
    blendInSpeed?: string;
    blendOutSpeed?: string;
    duration?: string;
    flags?: string;
    playbackRate?: string;
    lockX?: boolean;
    lockY?: boolean;
    lockZ?: boolean;
  }>({
    animDict: 'anim@mp_player_intmenu@key_fob@',
    animName: 'fob_click_fp',
    blendInSpeed: '8',
    blendOutSpeed: '8',
    duration: '1200',
    flags: '49',
    playbackRate: '1',
    lockX: false,
    lockY: false,
    lockZ: false,
  });

  return (
    <div className="flex w-full">
      <ScrollArea className="w-full">
        <div className="flex flex-col gap-[1vw]">
          <p>Anim dict</p>
          <Input
            value={animation.animDict}
            onChange={(e) =>
              setAnimation({ ...animation, animDict: e.target.value })
            }
          />
          <p>Anim name</p>
          <Input
            value={animation.animName}
            onChange={(e) =>
              setAnimation({ ...animation, animName: e.target.value })
            }
          />
          <p>BlendIn speed</p>
          <Input
            value={animation.blendInSpeed}
            onChange={(e) =>
              setAnimation({
                ...animation,
                blendInSpeed: e.target.value,
              })
            }
          />
          <p>BlendOut speed</p>
          <Input
            value={animation.blendOutSpeed}
            onChange={(e) =>
              setAnimation({
                ...animation,
                blendOutSpeed: e.target.value,
              })
            }
          />
          <p>Duration</p>
          <Input
            value={animation.duration}
            onChange={(e) =>
              setAnimation({
                ...animation,
                duration: e.target.value,
              })
            }
          />
          <p>Flags</p>
          <Input
            value={animation.flags}
            onChange={(e) =>
              setAnimation({ ...animation, flags: e.target.value })
            }
          />
          <p>Playback rate</p>
          <Input
            value={animation.playbackRate}
            onChange={(e) =>
              setAnimation({
                ...animation,
                playbackRate: e.target.value,
              })
            }
          />
          <Input
            type="checkbox"
            checked={animation.lockX}
            onChange={(e) =>
              setAnimation({ ...animation, lockX: e.target.checked })
            }
          />
          <Input
            type="checkbox"
            checked={animation.lockY}
            onChange={(e) =>
              setAnimation({ ...animation, lockY: e.target.checked })
            }
          />
          <Input
            type="checkbox"
            checked={animation.lockZ}
            onChange={(e) =>
              setAnimation({ ...animation, lockZ: e.target.checked })
            }
          />
          <Button
            onClick={() => {
              fetch({
                animDict: animation.animDict,
                animName: animation.animName,
                blendInSpeed: animation.blendInSpeed
                  ? +animation.blendInSpeed
                  : 0,
                blendOutSpeed: animation.blendOutSpeed
                  ? +animation.blendOutSpeed
                  : 0,
                duration: animation.duration ? +animation.duration : 0,
                flags: animation.flags ? +animation.flags : 0,
                playbackRate: animation.playbackRate
                  ? +animation.playbackRate
                  : 0,
                lockX: animation.lockX,
                lockY: animation.lockY,
                lockZ: animation.lockZ,
              });
            }}
          >
            Set Animation
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
}
