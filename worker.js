import { pipeline } from '@xenova/transformers';

class SingletonPipeline {
    static task = 'object-detection'
    static model = 'Xenova/detr-resnet-50'
    instance = null;

    static async getInstance() {
        if(!this.instance) {
            this.instance = await pipeline(this.task, this.model)
        }

        return this.instance
    }
}


self.addEventListener('message', async (event) => {
    const { file, threshold } = event.data;
    const detector =  await SingletonPipeline.getInstance();
    const result  = await detector(file,  { 
        threshold,
        percentage: true, 
    })

    const filteredResult = result.filter(detection => detection.score >= threshold)

    postMessage(filteredResult)
})