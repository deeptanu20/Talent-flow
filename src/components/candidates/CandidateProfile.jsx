import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import Tabs from '../ui/Tabs';
import Button from '../ui/Button';
import StageTimeline from './StageTimeline';
import NotesSection from './NotesSection';

const CandidateProfile = ({ candidate, onStageChange, onAddNote }) => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  if (!candidate) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-500">Candidate not found</p>
          <Link to="/candidates" className="text-blue-600 hover:text-blue-800">
            Back to candidates
          </Link>
        </div>
      </div>
    );
  }

  const getStageColor = (stage) => {
    const colors = {
      applied: 'default',
      screen: 'primary', 
      tech: 'warning',
      offer: 'info',
      hired: 'success',
      rejected: 'danger'
    };
    return colors[stage] || 'default';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{candidate.name}</h1>
              <p className="text-gray-600">{candidate.email}</p>
              <p className="text-gray-600">{candidate.phone}</p>
              {candidate.location && (
                <p className="text-gray-500 text-sm">📍 {candidate.location}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge variant={getStageColor(candidate.stage)} size="lg">
              {candidate.stage.toUpperCase()}
            </Badge>
            <Button variant="primary" size="sm">
              Contact
            </Button>
            <Button variant="outline" size="sm">
              Schedule Interview
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{candidate.experience}</p>
            <p className="text-sm text-gray-500">Years Experience</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{candidate.skills?.length || 0}</p>
            <p className="text-sm text-gray-500">Skills</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {candidate.timeline?.length || 0}
            </p>
            <p className="text-sm text-gray-500">Status Changes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">
              {new Date(candidate.appliedAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">Applied Date</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List className="bg-white rounded-lg border border-gray-200">
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="timeline">Timeline</Tabs.Trigger>
          <Tabs.Trigger value="notes">Notes</Tabs.Trigger>
          <Tabs.Trigger value="assessments">Assessments</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card>
              <Card.Header>
                <Card.Title>Personal Information</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                    <p className="text-gray-900">{candidate.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-gray-900">{candidate.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-gray-900">{candidate.phone}</p>
                  </div>
                  {candidate.location && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Location</label>
                      <p className="text-gray-900">{candidate.location}</p>
                    </div>
                  )}
                </div>
              </Card.Content>
            </Card>

            {/* Job Application */}
            <Card>
              <Card.Header>
                <Card.Title>Application Details</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Position Applied</label>
                    <p className="text-blue-600 font-medium">{candidate.jobTitle}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Current Stage</label>
                    <Badge variant={getStageColor(candidate.stage)} className="mt-1">
                      {candidate.stage}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Applied Date</label>
                    <p className="text-gray-900">{new Date(candidate.appliedAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Experience</label>
                    <p className="text-gray-900">{candidate.experience} years</p>
                  </div>
                </div>
              </Card.Content>
            </Card>

            {/* Skills */}
            <Card className="lg:col-span-2">
              <Card.Header>
                <Card.Title>Skills & Technologies</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills?.map((skill, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-50">
                      {skill}
                    </Badge>
                  )) || <p className="text-gray-500">No skills listed</p>}
                </div>
              </Card.Content>
            </Card>

            {/* Resume/CV */}
            {candidate.resume && (
              <Card className="lg:col-span-2">
                <Card.Header>
                  <Card.Title>Resume/CV</Card.Title>
                </Card.Header>
                <Card.Content>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{candidate.resume.name}</p>
                      <p className="text-sm text-gray-500">{candidate.resume.size} • Uploaded {candidate.resume.uploadedAt}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            )}
          </div>
        </Tabs.Content>

        <Tabs.Content value="timeline">
          <StageTimeline 
            timeline={candidate.timeline || []}
            currentStage={candidate.stage}
            onStageChange={(newStage) => onStageChange(candidate.id, newStage)}
          />
        </Tabs.Content>

        <Tabs.Content value="notes">
          <NotesSection 
            candidateId={candidate.id}
            notes={candidate.notes || []}
            onAddNote={onAddNote}
          />
        </Tabs.Content>

        <Tabs.Content value="assessments">
          <Card>
            <Card.Header>
              <Card.Title>Assessment Results</Card.Title>
            </Card.Header>
            <Card.Content>
              {candidate.assessments && candidate.assessments.length > 0 ? (
                <div className="space-y-4">
                  {candidate.assessments.map((assessment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{assessment.title}</h3>
                        <p className="text-sm text-gray-500">Completed on {assessment.completedAt}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">{assessment.score}%</p>
                        <p className="text-xs text-gray-500">Score</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p>No assessments completed yet</p>
                </div>
              )}
            </Card.Content>
          </Card>
        </Tabs.Content>
      </Tabs>
    </div>
  );
};

export default CandidateProfile;