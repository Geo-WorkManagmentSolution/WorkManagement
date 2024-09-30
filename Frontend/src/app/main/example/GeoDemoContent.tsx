import { memo } from 'react';

/**
 * DemoContent is a React component used to render a demo content on the page.
 * It renders a image on the page followed by a heading, some text and a footer.
 * It also renders a quote and some content about a person being transformed into a vermin.
 */
function GeoDemoContent() {
	return (
		<div>
			<img
				src="assets/images/demo-content/Geo_home.png"
				alt="beach"
				style={{
					maxWidth: '640px',
					width: '100%'
				}}
				className="rounded-md"
			/>
			<h1 className="py-16 font-semibold">Early Sunrise</h1>
			<h4 className="pb-12 font-medium">About Us</h4>
			<p>
				Geo Designs & Research Pvt Ltd (GDRPL) was founded in 2007. It took over the business of Geo Test House in 2014. Geo Test House was 
				founded in 1991 at Vadodara, Gujarat by Mr. Pradip Chauhan, ME Civil (Gold medalist) and having a rich experience in the field of civil engineering.
				Under the leadership and vision of our esteemed founder, we are proud to provide top-notch one-point solutions in all civil related matters. 
				We have our HO based at Vadodara and are geographically well spread seven branches, across Gujarat & Rajasthan with a state-of-art facility for 
				material testing. We have NABL ISO 17025:2005 accredited laboratory with all the digitized equipment.
			</p>
			<br></br>
			<h4 className="pb-12 font-medium">Our Vision</h4>
			<blockquote>
				<p>
				We proceed with a vision to become an international Civil Consultancy Company that provides a one-point solution for all civil works.
				</p>
			</blockquote>
			<br></br>
			<h4 className="pb-12 font-medium">Our Vision</h4>
			<blockquote>
				<p>
				We proceed with a vision to become an international Civil Consultancy Company that provides a one-point solution for all civil works.
				</p>
			</blockquote>
			<br></br>
			<h4 className="pb-12 font-medium">Our Mission</h4>
			<blockquote>
				<p>
				Connecting today and transforming tomorrow is the mission of the enterprise. 
				We have taken up the mission to provide best services to ensure a concrete relationship with its customers.
				</p>
			</blockquote>
			
		</div>
	);
}

export default memo(GeoDemoContent);
