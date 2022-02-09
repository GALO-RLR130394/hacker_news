import { Deserializable } from './deserializable';
import { FavesService } from '../services/faves.service';

export class Post implements Deserializable {
    created_at?: string;
    title?: string;
    url?: string;
    author?: string;
    points?: string;
    story_text?: string;
    comment_text?: string;
    num_comments?: number;
    story_id?: number;
    story_title?: string;
    story_url?: string;
    parent_id?: number;
    created_at_i?: number;
    _tags?:any[]=[];
    objectID?: string;
    _highlightResult?:any[]=[];
    fave?:boolean=false;

    deserialize(input: any) {
		/* Assign input to our object
	     * BEFORE deserialize our address
	     * to prevent already deserialized address
	     * from being overwritten.
	    */
    	Object.assign(this, input);

    	return this;
  	}

  	likePost(fave:boolean) {
  		this.fave=fave;
  	}
}
